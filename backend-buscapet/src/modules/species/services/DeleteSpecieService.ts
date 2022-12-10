import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteSpecieService {
  public async execute({ id }: IRequest): Promise<void> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findOne(id);
    if (!specie) {
      throw new AppError('Espécie não existe!');
    }

    speciesRepository.remove(specie);
  }
}

export default DeleteSpecieService;
