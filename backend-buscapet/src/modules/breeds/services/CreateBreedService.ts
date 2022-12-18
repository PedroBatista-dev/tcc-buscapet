import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { BreedsRepository } from '../typeorm/repositories/BreedsRepository';
import Breed from '../typeorm/entities/Breed';
import { SpeciesRepository } from '@modules/species/typeorm/repositories/SpeciesRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  specie_id: string;
  user_id: string;
}

class CreateBreedService {
  public async execute({ name, specie_id, user_id }: IRequest): Promise<Breed> {
    const usersRepository = getCustomRepository(UsersRepository);
    const breedsRepository = getCustomRepository(BreedsRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const breedExists = await breedsRepository.findByName(name, user_id);
    if (breedExists) {
      throw new AppError('Já existe uma raça com esse nome!');
    }

    const specieExists = await speciesRepository.findById(specie_id, user_id);
    if (!specieExists) {
      throw new AppError(
        'Não foi possível encontrar uma espécie com o id informado',
      );
    }

    const breed = breedsRepository.create({
      name,
      specie: specieExists,
      user_id,
    });

    await breedsRepository.save(breed);

    return breed;
  }
}

export default CreateBreedService;
