import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
}

class UpdateColorService {
  public async execute({ id, name }: IRequest): Promise<Color> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findOne(id);
    if (!color) {
      throw new AppError('Cor não existe!');
    }

    const colorExists = await colorsRepository.findByName(name);
    if (colorExists && name !== color.name) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    color.name = name;

    await colorsRepository.save(color);

    return color;
  }
}

export default UpdateColorService;
