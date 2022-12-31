import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../infra/typeorm/repositories/AnimalsRepository';
import Animal from '../infra/typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  status: string;
  user_id: string;
}

class UpdateStatusAnimalService {
  public async execute({ id, status, user_id }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    if (animal.status === status) {
      throw new AppError(`Animal já possui o status ${animal.status}`);
    }

    animal.status = status;

    await animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateStatusAnimalService;
