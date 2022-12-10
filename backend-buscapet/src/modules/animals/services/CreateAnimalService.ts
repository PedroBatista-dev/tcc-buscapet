import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

interface IRequest {
  name: string;
  age: number;
  sex: string;
  size: string;
  other_animals: string;
}

class CreateAnimalService {
  public async execute({
    name,
    age,
    sex,
    size,
    other_animals,
  }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animalExists = await animalsRepository.findByName(name);
    if (animalExists) {
      throw new AppError('Já existe um animal com esse nome!');
    }

    const animal = animalsRepository.create({
      name,
      age,
      sex,
      size,
      status: 'Criado',
      other_animals,
    });

    await animalsRepository.save(animal);

    return animal;
  }
}

export default CreateAnimalService;
