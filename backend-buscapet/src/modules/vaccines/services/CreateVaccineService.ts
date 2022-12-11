import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  user_id: string;
}

class CreateVaccineService {
  public async execute({ name, user_id }: IRequest): Promise<Vaccine> {
    const usersRepository = getCustomRepository(UsersRepository);
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const vaccineExists = await vaccinesRepository.findByName(name, user_id);
    if (vaccineExists) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    const vaccine = vaccinesRepository.create({
      name,
      user_id,
    });

    await vaccinesRepository.save(vaccine);

    return vaccine;
  }
}

export default CreateVaccineService;
