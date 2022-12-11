import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';

interface IRequest {
  user_id: string;
}

class ListSpecieService {
  public async execute({ user_id }: IRequest): Promise<Specie[]> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const species = await speciesRepository.find({
      where: {
        user_id,
      },
    });

    return species;
  }
}

export default ListSpecieService;
