import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';

interface IRequest {
  name: string;
}

class CreateSpecieService {
  public async execute({ name }: IRequest): Promise<Specie> {
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const specieExists = await speciesRepository.findByName(name);
    if (specieExists) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    const specie = speciesRepository.create({
      name,
    });

    await speciesRepository.save(specie);

    return specie;
  }
}

export default CreateSpecieService;
