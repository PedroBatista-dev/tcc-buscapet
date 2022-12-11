import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  age: number;
  sex: string;
  size: string;
  other_animals: string;
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
    user_id,
  }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    const animalExists = await animalsRepository.findByName(name, user_id);
    if (animalExists && name !== animal.name) {
      throw new AppError('Já existe um animal com esse nome!');
    }

    animal.name = name;
    animal.age = age;
    animal.sex = sex;
    animal.size = size;
    animal.other_animals = other_animals;

    await animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalService;
