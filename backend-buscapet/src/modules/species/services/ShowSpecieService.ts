import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowSpecieService {
  public async execute({ id }: IRequest): Promise<Specie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findOne(id);
    if (!specie) {
      throw new AppError('Espécie não existe!');
    }

    return specie;
  }
}

export default ShowSpecieService;
