import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowColorService {
  public async execute({ id }: IRequest): Promise<Color> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findOne(id);
    if (!color) {
      throw new AppError('Cor não existe!');
    }

    return color;
  }
}

export default ShowColorService;
