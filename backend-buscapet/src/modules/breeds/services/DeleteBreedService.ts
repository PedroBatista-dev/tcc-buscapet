import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class DeleteBreedService {
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breed = await breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    breedsRepository.remove(breed);
  }
}

export default DeleteBreedService;
