import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import { AnimalsRepository } from '@modules/animals/typeorm/repositories/AnimalsRepository';

interface IRequest {
  status: string;
  animal_id: string;
  ong_id: string;
  adopter_id: string;
}

class CreateAdoptionService {
  public async execute({
    status,
    animal_id,
    ong_id,
    adopter_id,
  }: IRequest): Promise<Adoption> {
    const usersRepository = getCustomRepository(UsersRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const ongExists = await usersRepository.findById(ong_id);
    if (!ongExists) {
      throw new AppError('Ong não encontrada!');
    }

    const adopterExists = await usersRepository.findById(adopter_id);
    if (!adopterExists) {
      throw new AppError('Adotante não encontrado!');
    }

    const animalExists = await animalsRepository.findById(animal_id, ong_id);
    if (!animalExists) {
      throw new AppError('Animal não encontrado!');
    }

    if (animalExists.status !== 'Adocao') {
      throw new AppError('Animal indisponível para adoção!');
    }

    const adoption = adoptionsRepository.create({
      status,
      animal: animalExists,
      ong: ongExists,
      adopter: adopterExists,
    });

    await adoptionsRepository.save(adoption);

    return adoption;
  }
}

export default CreateAdoptionService;
