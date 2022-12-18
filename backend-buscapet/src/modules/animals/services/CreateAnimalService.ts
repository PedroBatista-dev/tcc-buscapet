import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import { ColorsRepository } from '@modules/colors/typeorm/repositories/ColorsRepository';
import { BreedsRepository } from '@modules/breeds/typeorm/repositories/BreedsRepository';
import { SpeciesRepository } from '@modules/species/typeorm/repositories/SpeciesRepository';
import { VaccinesRepository } from '@modules/vaccines/typeorm/repositories/VaccinesRepository';

interface IVaccine {
  id: string;
  name: string;
}

interface IRequest {
  name: string;
  age: number;
  sex: string;
  size: string;
  other_animals: string;
  color_id: string;
  breed_id: string;
  specie_id: string;
  vaccines: IVaccine[];
  user_id: string;
}

class CreateAnimalService {
  public async execute({
    name,
    age,
    sex,
    size,
    other_animals,
    color_id,
    breed_id,
    specie_id,
    vaccines,
    user_id,
  }: IRequest): Promise<Animal> {
    const usersRepository = getCustomRepository(UsersRepository);
    const colorsRepository = getCustomRepository(ColorsRepository);
    const breedsRepository = getCustomRepository(BreedsRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);
    const vaccinesRepository = getCustomRepository(VaccinesRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const colorExists = await colorsRepository.findById(color_id, user_id);
    if (!colorExists) {
      throw new AppError('Cor não encontrada!');
    }

    const specieExists = await speciesRepository.findById(specie_id, user_id);
    if (!specieExists) {
      throw new AppError('Espécie não encontrada!');
    }

    const breedExists = await breedsRepository.findById(breed_id, user_id);
    if (!breedExists) {
      throw new AppError('Raça não encontrada!');
    }

    if (specieExists.id !== breedExists.specie_id) {
      throw new AppError('Raça não pertence a espécie informada!');
    }

    const animalExists = await animalsRepository.findByName(name, user_id);
    if (animalExists) {
      throw new AppError('Já existe um animal com esse nome!');
    }

    const existsVaccines = await vaccinesRepository.findAllByIds(vaccines);
    if (!existsVaccines.length) {
      throw new AppError(
        'Não foram encontradas as vacinas com os ids informados!',
      );
    }

    const existsVaccinesIds = existsVaccines.map(vaccine => vaccine.id);
    const checkInexistentVaccines = vaccines.filter(
      vaccine => !existsVaccinesIds.includes(vaccine.id),
    );
    if (checkInexistentVaccines.length) {
      throw new AppError(
        `Não foi encontrada a vacina ${checkInexistentVaccines[0].name}`,
      );
    }

    const serializedVaccines = vaccines.map(vaccine => ({
      vaccine_id: vaccine.id,
    }));

    const animal = animalsRepository.create({
      name,
      age,
      sex,
      size,
      status: 'Criado',
      other_animals,
      color: colorExists,
      breed: breedExists,
      specie: specieExists,
      animals_vaccine: serializedVaccines,
      user_id,
    });

    await animalsRepository.save(animal);

    return animal;
  }
}

export default CreateAnimalService;
