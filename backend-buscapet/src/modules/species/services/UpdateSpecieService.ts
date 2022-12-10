import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
}

class UpdateSpecieService {
  public async execute({ id, name }: IRequest): Promise<Specie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specie = await speciesRepository.findOne(id);
    if (!specie) {
      throw new AppError('Espécie não existe!');
    }

    const specieExists = await speciesRepository.findByName(name);
    if (specieExists && name !== specie.name) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    specie.name = name;

    await speciesRepository.save(specie);

    return specie;
  }
}

export default UpdateSpecieService;
