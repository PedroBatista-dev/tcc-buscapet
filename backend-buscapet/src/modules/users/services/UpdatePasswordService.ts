import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  password: string;
  old_password: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    password,
    old_password,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      user.password,
    );
    if (!checkOldPassword) {
      throw new AppError('Senha antiga não é igual a senha salva no usuário');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdatePasswordService;
