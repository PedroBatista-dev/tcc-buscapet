import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import { AnimalsRepository } from '@modules/animals/typeorm/repositories/AnimalsRepository';

interface IRequest {
  animal_id: string;
  adopter_id: string;
}

class CreateAdoptionService {
  public async execute({ animal_id, adopter_id }: IRequest): Promise<Adoption> {
    const usersRepository = getCustomRepository(UsersRepository);
    const animalsRepository = getCustomRepository(AnimalsRepository);
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const animalExists = await animalsRepository.findOne({
      where: {
        id: animal_id,
      },
    });
    if (!animalExists) {
      throw new AppError('Animal não encontrado!');
    }
    if (animalExists.status !== 'Adocao') {
      throw new AppError('Animal indisponível para adoção!');
    }

    const ongExists = await usersRepository.findById(animalExists.user_id);
    if (!ongExists) {
      throw new AppError('Ong não encontrada!');
    }

    const adopterExists = await usersRepository.findById(adopter_id);
    if (!adopterExists) {
      throw new AppError('Adotante não encontrado!');
    }

    const adoption = adoptionsRepository.create({
      status: 'Solicitada',
      animal: animalExists,
      ong: ongExists,
      adopter: adopterExists,
    });

    await adoptionsRepository.save(adoption);

    return adoption;
  }
}

export default CreateAdoptionService;
