import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';

class ListSpecieService {
  public async execute(): Promise<Specie[]> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const species = await speciesRepository.find();

    return species;
  }
}

export default ListSpecieService;
