import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../infra/typeorm/repositories/ColorsRepository';
import Color from '../infra/typeorm/entities/Color';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

class UpdateColorService {
  public async execute({ id, name, user_id }: IRequest): Promise<Color> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    const colorExists = await colorsRepository.findByName(name, user_id);
    if (colorExists && name !== color.name) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    color.name = name;

    await colorsRepository.save(color);

    return color;
  }
}

export default UpdateColorService;
