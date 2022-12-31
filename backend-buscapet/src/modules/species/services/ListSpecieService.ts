import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../infra/typeorm/repositories/SpeciesRepository';
import Specie from '../infra/typeorm/entities/Specie';

interface IRequest {
  user_id: string;
}

interface IPaginateSpecie {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Specie[];
}

class ListSpecieService {
  public async execute({ user_id }: IRequest): Promise<IPaginateSpecie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const species = await speciesRepository
      .createQueryBuilder('specie')
      .leftJoinAndSelect('specie.breeds', 'breed')
      .where('specie.user_id = :user_id', { user_id })
      .paginate();

    return species as IPaginateSpecie;
  }
}

export default ListSpecieService;
