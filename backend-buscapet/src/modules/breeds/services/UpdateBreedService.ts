import AppError from '../../../shared/errors/AppError';
import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';
import { inject, injectable } from 'tsyringe';
import { IBreed } from '../domain/models/IBreed';
import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';

interface IRequest {
  id: string;
  name: string;
  specie_id: string;
  user_id: string;
}

@injectable()
class UpdateBreedService {
  constructor(
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({
    id,
    name,
    specie_id,
    user_id,
  }: IRequest): Promise<IBreed> {
    const breed = await this.breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    const breedExists = await this.breedsRepository.findByName(name, user_id);
    if (breedExists && name !== breed.name) {
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

    breed.name = name;
    breed.specie = specieExists;

    await this.breedsRepository.save(breed);

    return breed;
  }
}

export default UpdateBreedService;
