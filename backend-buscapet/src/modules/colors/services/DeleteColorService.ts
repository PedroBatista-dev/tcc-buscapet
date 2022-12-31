import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../infra/typeorm/repositories/ColorsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class DeleteColorService {
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const color = await colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    await colorsRepository.remove(color);
  }
}

export default DeleteColorService;
