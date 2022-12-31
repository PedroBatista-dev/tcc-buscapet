import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../infra/typeorm/repositories/ColorsRepository';
import Color from '../infra/typeorm/entities/Color';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class ShowColorService {
  public async execute({ id, user_id }: IRequest): Promise<Color> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    return color;
  }
}

export default ShowColorService;
