import AppError from '../../../shared/errors/AppError';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  id: string;
  user_id: string;
  isOng: boolean;
}

@injectable()
class ShowAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ id, user_id, isOng }: IRequest): Promise<IAnimal> {
    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animal = await this.animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    return animal;
  }
}

export default ShowAnimalService;
