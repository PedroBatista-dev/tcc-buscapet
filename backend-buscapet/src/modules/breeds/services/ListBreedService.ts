import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../infra/typeorm/repositories/BreedsRepository';
import Breed from '../infra/typeorm/entities/Breed';

interface IRequest {
  user_id: string;
}

interface IPaginateBreed {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Breed[];
}

class ListBreedService {
  public async execute({ user_id }: IRequest): Promise<IPaginateBreed> {
    const breedsRepository = getCustomRepository(BreedsRepository);

    const breeds = await breedsRepository
      .createQueryBuilder('breed')
      .innerJoinAndSelect('breed.specie', 'specie')
      .where('breed.user_id = :user_id', { user_id })
      .paginate();

    return breeds as IPaginateBreed;
  }
}

export default ListBreedService;
