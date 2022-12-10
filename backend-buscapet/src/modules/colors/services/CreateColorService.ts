import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';

interface IRequest {
  name: string;
}

class CreateColorService {
  public async execute({ name }: IRequest): Promise<Color> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const colorExists = await colorsRepository.findByName(name);
    if (colorExists) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    const color = colorsRepository.create({
      name,
    });

    await colorsRepository.save(color);

    return color;
  }
}

export default CreateColorService;
