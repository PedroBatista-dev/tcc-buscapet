import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteSpecieService {
  constructor(
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const specie = await this.speciesRepository.findById(id, user_id);
    if (!specie) {
      throw new AppError('Espécie não encontrada!');
    }

    await this.speciesRepository.remove(specie);
  }
}

export default DeleteSpecieService;
