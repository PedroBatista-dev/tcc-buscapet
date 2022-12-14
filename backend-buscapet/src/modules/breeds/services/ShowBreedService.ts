import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class ShowBreedService {
  public async execute({ id, user_id }: IRequest): Promise<Breed> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breed = await breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    return breed;
  }
}

export default ShowBreedService;
