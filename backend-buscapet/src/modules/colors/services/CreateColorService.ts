import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  user_id: string;
}

class CreateColorService {
  public async execute({ name, user_id }: IRequest): Promise<Color> {
    const usersRepository = getCustomRepository(UsersRepository);
    const colorsRepository = getCustomRepository(ColorsRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const colorExists = await colorsRepository.findByName(name, user_id);
    if (colorExists) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    const color = colorsRepository.create({
      name,
      user_id,
    });

    await colorsRepository.save(color);

    return color;
  }
}

export default CreateColorService;
