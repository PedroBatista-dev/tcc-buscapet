import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';
import { ColorsRepository } from '@modules/colors/typeorm/repositories/ColorsRepository';
import { BreedsRepository } from '@modules/breeds/typeorm/repositories/BreedsRepository';
import { SpeciesRepository } from '@modules/species/typeorm/repositories/SpeciesRepository';
import { VaccinesRepository } from '@modules/vaccines/typeorm/repositories/VaccinesRepository';
import AnimalsVaccines from '../typeorm/entities/AnimalsVaccines';
import { AnimalsVaccinesRepository } from '../typeorm/repositories/AnimalsVaccinesRepository';

interface IVaccine {
  id: string;
  name: string;
}

interface IRequest {
  id: string;
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

class UpdateAnimalService {
  public async execute({
    id,
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
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const colorsRepository = getCustomRepository(ColorsRepository);
    const breedsRepository = getCustomRepository(BreedsRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);
    const vaccinesRepository = getCustomRepository(VaccinesRepository);
    const animalsVaccinesRepository = getCustomRepository(
      AnimalsVaccinesRepository,
    );

    const animal = await animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    const animalExists = await animalsRepository.findByName(name, user_id);
    if (animalExists && name !== animal.name) {
      throw new AppError('Já existe um animal com esse nome!');
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

    const animalsVaccinesExists =
      await animalsVaccinesRepository.findAllByAnimalId(id);

    await animalsVaccinesRepository.remove(animalsVaccinesExists);

    animal.name = name;
    animal.age = age;
    animal.sex = sex;
    animal.size = size;
    animal.other_animals = other_animals;
    animal.color = colorExists;
    animal.specie = specieExists;
    animal.breed = breedExists;
    animal.animals_vaccine = serializedVaccines as AnimalsVaccines[];

    await animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalService;
