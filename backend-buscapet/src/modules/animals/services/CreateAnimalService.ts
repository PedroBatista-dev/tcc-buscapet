import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  age: number;
  sex: string;
  size: string;
  other_animals: string;
  user_id: string;
}

class CreateAnimalService {
  public async execute({
    name,
    age,
    sex,
    size,
    other_animals,
    user_id,
  }: IRequest): Promise<Animal> {
    const usersRepository = getCustomRepository(UsersRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const animalExists = await animalsRepository.findByName(name, user_id);
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
      user_id,
    });

    await animalsRepository.save(animal);

    return animal;
  }
}

export default CreateAnimalService;
