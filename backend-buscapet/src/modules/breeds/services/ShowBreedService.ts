import AppError from '@shared/errors/AppError';
import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';
import { inject, injectable } from 'tsyringe';
import { IBreed } from '../domain/models/IBreed';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ShowBreedService {
  constructor(
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IBreed> {
    const breed = await this.breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    return breed;
  }
}

export default ShowBreedService;
