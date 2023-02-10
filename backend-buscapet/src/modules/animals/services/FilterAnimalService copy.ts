import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  name: string;
  sex: string;
  size: string;
  other: string;
}

@injectable()
class FilterAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({
    name,
    sex,
    size,
    other,
  }: IRequest): Promise<IAnimal[]> {
    const animals = await this.animalsRepository.filter(name, sex, size, other);

    return animals;
  }
}

export default FilterAnimalService;
