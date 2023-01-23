import Animal from '../entities/Animal';
import { getRepository, Like, Repository } from 'typeorm';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { ICreateAnimal } from '@modules/animals/domain/models/ICreateAnimal';

export class AnimalsRepository implements IAnimalsRepository {
  private ormRepository: Repository<Animal>;

  constructor() {
    this.ormRepository = getRepository(Animal);
  }

  public async create({
    name,
    age,
    sex,
    size,
    status,
    other_animals,
    color,
    breed,
    specie,
    animals_vaccine,
    user_id,
  }: ICreateAnimal): Promise<Animal> {
    const animal = this.ormRepository.create({
      name,
      age,
      sex,
      size,
      status,
      other_animals,
      color,
      breed,
      specie,
      animals_vaccine,
      user_id,
    });

    await this.ormRepository.save(animal);

    return animal;
  }

  public async save(animal: Animal): Promise<Animal> {
    await this.ormRepository.save(animal);

    return animal;
  }

  public async remove(animal: Animal): Promise<void> {
    await this.ormRepository.remove(animal);
  }

  public async findAll(
    user_id: string,
    isOng: boolean,
    name: string,
  ): Promise<Animal[]> {
    if (name) {
      if (isOng) {
        const animals = await this.ormRepository.find({
          where: {
            name: Like(`%${name}%`),
            user_id,
          },
          relations: ['color', 'specie', 'breed', 'animals_vaccine'],
        });
        return animals;
      } else {
        const animals = await this.ormRepository.find({
          where: {
            name: Like(`%${name}%`),
          },
          relations: ['color', 'specie', 'breed', 'animals_vaccine'],
        });
        return animals;
      }
    } else {
      if (isOng) {
        const animals = await this.ormRepository.find({
          where: {
            user_id,
          },
          relations: ['color', 'specie', 'breed', 'animals_vaccine'],
        });
        return animals;
      } else {
        const animals = await this.ormRepository.find({
          relations: ['color', 'specie', 'breed', 'animals_vaccine'],
        });
        return animals;
      }
    }
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Animal | undefined> {
    const animal = this.ormRepository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return animal;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Animal | undefined> {
    const animal = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['color', 'specie', 'breed', 'animals_vaccine'],
    });

    return animal;
  }

  public async findByIdAll(id: string): Promise<Animal | undefined> {
    const animal = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return animal;
  }
}
