import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';
import { inject, injectable } from 'tsyringe';
import { IPaginateBreed } from '../domain/models/IPaginateBreed';

interface IRequest {
  user_id: string;
}

@injectable()
class ListBreedService {
  constructor(
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IPaginateBreed> {
    const breeds = await this.breedsRepository.findAll(user_id);

    return breeds;
  }
}

export default ListBreedService;
