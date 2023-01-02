import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { IVaccinesRepository } from '@modules/vaccines/domain/repositories/IVaccinesRepository';
import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';
import { IBreedsRepository } from '@modules/breeds/domain/repositories/IBreedsRepository';
import { IColorsRepository } from '@modules/colors/domain/repositories/IColorsRepository';
import { IAnimal } from '../domain/models/IAnimal';
import { IAnimalsVaccinesRepository } from '../domain/repositories/IAnimalsvaccinesRepository';
import { ICreateAnimalsVaccines } from '../domain/models/ICreateAnimalsVaccines';

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
  isOng: boolean;
}

@injectable()
class UpdateAnimalService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AnimalsVaccinesRepository')
    private animalsVaccinesRepository: IAnimalsVaccinesRepository,
  ) {}

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
    isOng,
  }: IRequest): Promise<IAnimal> {
    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animal = await this.animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    const animalExists = await this.animalsRepository.findByName(name, user_id);
    if (animalExists && name !== animal.name) {
      throw new AppError('Já existe um animal com esse nome!');
    }

    const colorExists = await this.colorsRepository.findById(color_id, user_id);
    if (!colorExists) {
      throw new AppError('Cor não encontrada!');
    }

    const specieExists = await this.speciesRepository.findById(
      specie_id,
      user_id,
    );
    if (!specieExists) {
      throw new AppError('Espécie não encontrada!');
    }

    const breedExists = await this.breedsRepository.findById(breed_id, user_id);
    if (!breedExists) {
      throw new AppError('Raça não encontrada!');
    }

    if (specieExists.id !== breedExists.specie_id) {
      throw new AppError('Raça não pertence a espécie informada!');
    }

    const existsVaccines = await this.vaccinesRepository.findAllByIds(
      vaccines,
      user_id,
    );
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

    const idVaccines: ICreateAnimalsVaccines[] = [];

    vaccines.forEach(vaccine => {
      idVaccines.push({ vaccine_id: vaccine.id });
    });

    const animalsVaccinesExists =
      await this.animalsVaccinesRepository.findAllByAnimalId(id);

    await this.animalsVaccinesRepository.remove(animalsVaccinesExists);

    animal.name = name;
    animal.age = age;
    animal.sex = sex;
    animal.size = size;
    animal.other_animals = other_animals;
    animal.color = colorExists;
    animal.specie = specieExists;
    animal.breed = breedExists;
    animal.animals_vaccine = idVaccines;

    await this.animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalService;
