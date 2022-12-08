import { getCustomRepository } from 'typeorm';
import { AnimalRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  status: string;
}

class UpdateStatusAnimalService {
  public async execute({ id, status }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalRepository);

    const animal = await animalsRepository.findOne(id);
    if (!animal) {
      throw new AppError('Animal não existe!');
    }

    animal.status = status;

    await animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateStatusAnimalService;
