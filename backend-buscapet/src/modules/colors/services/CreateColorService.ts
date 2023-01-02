import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';
import { IColor } from '../domain/models/IColor';
import { ICreateColor } from '../domain/models/ICreateColor';

@injectable()
class CreateColorService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ name, user_id }: ICreateColor): Promise<IColor> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const colorExists = await this.colorsRepository.findByName(name, user_id);
    if (colorExists) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    const color = await this.colorsRepository.create({
      name,
      user_id,
    });

    return color;
  }
}

export default CreateColorService;
