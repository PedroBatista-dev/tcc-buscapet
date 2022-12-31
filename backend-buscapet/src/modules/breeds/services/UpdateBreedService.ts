import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../infra/typeorm/repositories/BreedsRepository';
import Breed from '../infra/typeorm/entities/Breed';
import AppError from '@shared/errors/AppError';
import { SpeciesRepository } from '@modules/species/infra/typeorm/repositories/SpeciesRepository';

interface IRequest {
  id: string;
  name: string;
  specie_id: string;
  user_id: string;
}

class UpdateBreedService {
  public async execute({
    id,
    name,
    specie_id,
    user_id,
  }: IRequest): Promise<Breed> {
    const breedsRepository = getCustomRepository(BreedsRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const breed = await breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    const breedExists = await breedsRepository.findByName(name, user_id);
    if (breedExists && name !== breed.name) {
      throw new AppError('Já existe uma raça com esse nome!');
    }

    const specieExists = await speciesRepository.findById(specie_id, user_id);
    if (!specieExists) {
      throw new AppError(
        'Não foi possível encontrar uma espécie com o id informado',
      );
    }

    breed.name = name;
    breed.specie = specieExists;

    await breedsRepository.save(breed);

    return breed;
  }
}

export default UpdateBreedService;
