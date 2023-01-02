import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISpecie } from '../domain/models/ISpecie';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

@injectable()
class UpdateSpecieService {
  constructor(
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ id, name, user_id }: IRequest): Promise<ISpecie> {
    const specie = await this.speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    const specieExists = await this.speciesRepository.findByName(name, user_id);
    if (specieExists && name !== specie.name) {
      throw new AppError('Já existe uma espécie com esse nome!');
    }

    specie.name = name;

    await this.speciesRepository.save(specie);

    return specie;
  }
}

export default UpdateSpecieService;
