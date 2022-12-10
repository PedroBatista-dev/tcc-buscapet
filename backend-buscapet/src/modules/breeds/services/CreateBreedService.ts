import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';
import { SpeciesRepository } from '@modules/species/typeorm/repositories/SpeciesRepository';

interface IRequest {
  name: string;
  specie_id: string;
}

class CreateBreedService {
  public async execute({ name, specie_id }: IRequest): Promise<Breed> {
    const breedsRepository = getCustomRepository(BreedsRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const breedExists = await breedsRepository.findByName(name);
    if (breedExists) {
      throw new AppError('Já existe uma raça com esse nome!');
    }

    const specieExists = await speciesRepository.findById(specie_id);
    if (!specieExists) {
      throw new AppError(
        'Não foi possível encontrar uma espécie com o id informado',
      );
    }

    const breed = breedsRepository.create({
      name,
      specie: specieExists,
    });

    await breedsRepository.save(breed);

    return breed;
  }
}

export default CreateBreedService;
