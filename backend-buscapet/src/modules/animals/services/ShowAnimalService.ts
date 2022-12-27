import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
  isOng: boolean;
}

class ShowAnimalService {
  public async execute({ id, user_id, isOng }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animal = await animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    return animal;
  }
}

export default ShowAnimalService;
