import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { SpeciesRepository } from '../typeorm/repositories/SpeciesRepository';
import Specie from '../typeorm/entities/Specie';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  user_id: string;
}

class CreateSpecieService {
  public async execute({ name, user_id }: IRequest): Promise<Specie> {
    const usersRepository = getCustomRepository(UsersRepository);
    const speciesRepository = getCustomRepository(SpeciesRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const specieExists = await speciesRepository.findByName(name, user_id);
    if (specieExists) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    const specie = speciesRepository.create({
      name,
      user_id,
    });

    await speciesRepository.save(specie);

    return specie;
  }
}

export default CreateSpecieService;
