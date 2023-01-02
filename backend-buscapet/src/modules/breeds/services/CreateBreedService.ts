import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IBreed } from '../domain/models/IBreed';
import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';

interface IRequest {
  name: string;
  specie_id: string;
  user_id: string;
}

@injectable()
class CreateBreedService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}
  public async execute({
    name,
    specie_id,
    user_id,
  }: IRequest): Promise<IBreed> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const breedExists = await this.breedsRepository.findByName(name, user_id);
    if (breedExists) {
      throw new AppError('Já existe uma raça com esse nome!');
    }

    const specieExists = await this.speciesRepository.findById(
      specie_id,
      user_id,
    );
    if (!specieExists) {
      throw new AppError(
        'Não foi possível encontrar uma espécie com o id informado',
      );
    }

    const breed = await this.breedsRepository.create({
      name,
      specie: specieExists,
      user_id,
    });

    return breed;
  }
}

export default CreateBreedService;
