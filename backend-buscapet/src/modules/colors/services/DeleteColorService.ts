import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteColorService {
  public async execute({ id }: IRequest): Promise<void> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findOne(id);
    if (!color) {
      throw new AppError('Cor não existe!');
    }

    colorsRepository.remove(color);
  }
}

export default DeleteColorService;
