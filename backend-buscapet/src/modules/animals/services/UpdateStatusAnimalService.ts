import AppError from '../../../shared/errors/AppError';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  id: string;
  status: string;
  user_id: string;
}

@injectable()
class UpdateStatusAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ id, status, user_id }: IRequest): Promise<IAnimal> {
    const animal = await this.animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    if (animal.status === status) {
      throw new AppError(`Animal já possui o status ${animal.status}`);
    }

    animal.status = status;

    await this.animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateStatusAnimalService;
