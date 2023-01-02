import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISpecie } from '../domain/models/ISpecie';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ShowSpecieService {
  constructor(
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<ISpecie> {
    const specie = await this.speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    return specie;
  }
}

export default ShowSpecieService;
