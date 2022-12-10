import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';

class ListBreedService {
  public async execute(): Promise<Breed[]> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breeds = await breedsRepository.find();

    return breeds;
  }
}

export default ListBreedService;
