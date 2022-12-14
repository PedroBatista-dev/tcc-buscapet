import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';

interface IRequest {
  user_id: string;
}

class ListBreedService {
  public async execute({ user_id }: IRequest): Promise<Breed[]> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breeds = await breedsRepository.find({
      where: {
        user_id,
      },
    });

    return breeds;
  }
}

export default ListBreedService;
