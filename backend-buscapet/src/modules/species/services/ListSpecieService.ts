import { inject, injectable } from 'tsyringe';
import { IPaginateSpecie } from '../domain/models/IPaginateSpecie';
import { ISpeciesRepository } from '../domain/repositories/ISpeciesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListSpecieService {
  constructor(
    @inject('SpeciesRepository')
    private speciesRepository: ISpeciesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IPaginateSpecie> {
    const species = await this.speciesRepository.findAll(user_id);

    return species;
  }
}

export default ListSpecieService;
