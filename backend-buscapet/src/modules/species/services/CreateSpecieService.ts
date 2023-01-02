import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { ICreateSpecie } from '../domain/models/ICreateSpecie';
import { ISpecie } from '../domain/models/ISpecie';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

@injectable()
class CreateSpecieService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ name, user_id }: ICreateSpecie): Promise<ISpecie> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const specieExists = await this.speciesRepository.findByName(name, user_id);
    if (specieExists) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    const specie = await this.speciesRepository.create({
      name,
      user_id,
    });

    return specie;
  }
}

export default CreateSpecieService;
