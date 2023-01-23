import AppError from '../../../shared/errors/AppError';
import { ICreateAnimalsVaccines } from '../domain/models/ICreateAnimalsVaccines';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IVaccinesRepository } from '@modules/vaccines/domain/repositories/IVaccinesRepository';
import { IBreedsRepository } from '@modules/breeds/domain/repositories/IBreedsRepository';
import { IColorsRepository } from '@modules/colors/domain/repositories/IColorsRepository';
import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequestVaccine {
  vaccine_id: string;
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
  animals_vaccine: IRequestVaccine[];
  user_id: string;
  isOng: boolean;
}

@injectable()
class CreateAnimalService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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
  ) {}

  public async execute({
    name,
    age,
    sex,
    size,
    other_animals,
    color_id,
    breed_id,
    specie_id,
    animals_vaccine,
    user_id,
    isOng,
  }: IRequest): Promise<IAnimal> {
    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
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

    const animalExists = await this.animalsRepository.findByName(name, user_id);
    if (animalExists) {
      throw new AppError('Já existe um animal com esse nome!');
    }

    if (animals_vaccine.length) {
      const existsVaccines = await this.vaccinesRepository.findAllByIds(
        animals_vaccine,
        user_id,
      );
      if (!existsVaccines.length) {
        throw new AppError(
          'Não foram encontradas as vacinas com os ids informados!',
        );
      }

      const existsVaccinesIds = existsVaccines.map(vaccine => vaccine.id);
      const checkInexistentVaccines = animals_vaccine.filter(
        vaccine => !existsVaccinesIds.includes(vaccine.vaccine_id),
      );
      if (checkInexistentVaccines.length) {
        throw new AppError(
          `Não foi encontrada a vacina ${checkInexistentVaccines[0].vaccine_id}`,
        );
      }
    }

    const idVaccines: ICreateAnimalsVaccines[] = [];

    animals_vaccine.forEach(vaccine => {
      idVaccines.push({ vaccine_id: vaccine.vaccine_id });
    });

    const animal = await this.animalsRepository.create({
      name,
      age,
      sex,
      size,
      status: 'Criado',
      other_animals,
      color: colorExists,
      breed: breedExists,
      specie: specieExists,
      animals_vaccine: idVaccines,
      user_id,
    });

    return animal;
  }
}

export default CreateAnimalService;
