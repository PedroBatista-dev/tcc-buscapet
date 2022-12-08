import { getCustomRepository } from 'typeorm';
import { AnimalRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowAnimalService {
  public async execute({ id }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalRepository);

    const animal = await animalsRepository.findOne(id);
    if (!animal) {
      throw new AppError('Animal não existe!');
    }

    return animal;
  }
}

export default ShowAnimalService;
