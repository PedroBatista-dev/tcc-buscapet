import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../infra/typeorm/repositories/SpeciesRepository';
import Specie from '../infra/typeorm/entities/Specie';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class ShowSpecieService {
  public async execute({ id, user_id }: IRequest): Promise<Specie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    return specie;
  }
}

export default ShowSpecieService;
