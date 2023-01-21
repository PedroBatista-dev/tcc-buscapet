import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';
import { inject, injectable } from 'tsyringe';
import { IBreed } from '../domain/models/IBreed';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class ListBreedService {
  constructor(
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<IBreed[]> {
    const breeds = await this.breedsRepository.findAll(user_id, name);

    return breeds;
  }
}

export default ListBreedService;
