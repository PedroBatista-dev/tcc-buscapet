import { inject, injectable } from 'tsyringe';
import { ISpecie } from '../domain/models/ISpecie';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class ListSpecieService {
  constructor(
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<ISpecie[]> {
    const species = await this.speciesRepository.findAll(user_id, name);

    return species;
  }
}

export default ListSpecieService;
