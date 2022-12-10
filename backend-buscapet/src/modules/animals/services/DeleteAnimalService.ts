import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteAnimalService {
  public async execute({ id }: IRequest): Promise<void> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findOne(id);
    if (!animal) {
      throw new AppError('Animal não existe!');
    }

    animalsRepository.remove(animal);
  }
}

export default DeleteAnimalService;
