import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

interface IRequest {
  user_id: string;
  isOng: boolean;
}

interface IPaginateAnimal {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Animal[];
}

class ListAnimalService {
  public async execute({ user_id, isOng }: IRequest): Promise<IPaginateAnimal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    if (isOng) {
      const animals = await animalsRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.color', 'color')
        .innerJoinAndSelect('adoption.specie', 'specie')
        .innerJoinAndSelect('adoption.breed', 'breed')
        .innerJoinAndSelect('adoption.animals_vaccine', 'animals_vaccine')
        .where('adoption.user_id = :user_id', { user_id })
        .paginate();

      return animals as IPaginateAnimal;
    } else {
      const animals = await animalsRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.color', 'color')
        .innerJoinAndSelect('adoption.specie', 'specie')
        .innerJoinAndSelect('adoption.breed', 'breed')
        .innerJoinAndSelect('adoption.animals_vaccine', 'animals_vaccine')
        .paginate();

      return animals as IPaginateAnimal;
    }
  }
}

export default ListAnimalService;
