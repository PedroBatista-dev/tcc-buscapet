import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowBreedService {
  public async execute({ id }: IRequest): Promise<Breed> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breed = await breedsRepository.findOne(id);
    if (!breed) {
      throw new AppError('Raça não existe!');
    }

    return breed;
  }
}

export default ShowBreedService;
