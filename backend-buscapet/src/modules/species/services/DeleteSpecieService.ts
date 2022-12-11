import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class DeleteSpecieService {
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    speciesRepository.remove(specie);
  }
}

export default DeleteSpecieService;
