import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

interface IRequest {
  user_id: string;
}

class ListAnimalService {
  public async execute({ user_id }: IRequest): Promise<Animal[]> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animals = await animalsRepository.find({
      where: {
        user_id,
      },
    });

    return animals;
  }
}

export default ListAnimalService;
