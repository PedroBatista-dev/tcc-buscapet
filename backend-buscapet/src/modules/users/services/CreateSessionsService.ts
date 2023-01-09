import AppError from '../../../shared/errors/AppError';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email ou senha incorretos!', 401);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordConfirmed) {
      throw new AppError('Email ou senha incorretos!', 401);
    }

    const token = sign(
      { isOng: user.isOng, name: user.name, id: user.id },
      authConfig.jwt.secret as Secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}

export default CreateSessionsService;
