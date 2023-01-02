import AppError from '@shared/errors/AppError';
import { IBreedsRepository } from '../domain/repositories/IBreedsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteBreedService {
  constructor(
    @inject('BreedsRepository')
    private breedsRepository: IBreedsRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const breed = await this.breedsRepository.findById(id, user_id);
    if (!breed) {
      throw new AppError('Raça não encontrada!');
    }

    await this.breedsRepository.remove(breed);
  }
}

export default DeleteBreedService;
