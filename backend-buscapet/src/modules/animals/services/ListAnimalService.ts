import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IPaginateAnimal } from '../domain/models/IPaginateAnimal';

interface IRequest {
  user_id: string;
  isOng: boolean;
}

@injectable()
class ListAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ user_id, isOng }: IRequest): Promise<IPaginateAnimal> {
    const animals = await this.animalsRepository.findAll(user_id, isOng);

    return animals;
  }
}

export default ListAnimalService;
