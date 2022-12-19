import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

class ListAnimalAdopterService {
  public async execute(): Promise<Animal[]> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      relations: ['color', 'specie', 'breed', 'animals_vaccine'],
    });

    return animals;
  }
}

export default ListAnimalAdopterService;
