import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  user_id: string;
  isOng: boolean;
  name: string;
}

@injectable()
class ListAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ user_id, isOng, name }: IRequest): Promise<IAnimal[]> {
    const animals = await this.animalsRepository.findAll(user_id, isOng, name);

    return animals;
  }
}

export default ListAnimalService;
