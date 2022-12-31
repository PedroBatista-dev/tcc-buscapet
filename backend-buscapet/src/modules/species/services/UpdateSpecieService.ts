import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../infra/typeorm/repositories/SpeciesRepository';
import Specie from '../infra/typeorm/entities/Specie';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

class UpdateSpecieService {
  public async execute({ id, name, user_id }: IRequest): Promise<Specie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    const specieExists = await speciesRepository.findByName(name, user_id);
    if (specieExists && name !== specie.name) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    specie.name = name;

    await speciesRepository.save(specie);

    return specie;
  }
}

export default UpdateSpecieService;
