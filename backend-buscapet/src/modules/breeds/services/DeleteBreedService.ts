import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteBreedService {
  public async execute({ id }: IRequest): Promise<void> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breed = await breedsRepository.findOne(id);
    if (!breed) {
      throw new AppError('Raça não existe!');
    }

    breedsRepository.remove(breed);
  }
}

export default DeleteBreedService;
