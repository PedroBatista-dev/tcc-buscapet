import { getCustomRepository } from 'typeorm';
import { AnimalRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

class ListAnimalService {
  public async execute(): Promise<Animal[]> {
    const animalsRepository = getCustomRepository(AnimalRepository);

    const animals = await animalsRepository.find();

    return animals;
  }
}

export default ListAnimalService;
