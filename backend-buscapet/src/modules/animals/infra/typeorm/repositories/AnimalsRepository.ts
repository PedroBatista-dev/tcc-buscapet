import Animal from '../entities/Animal';
import { getRepository, Repository } from 'typeorm';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { ICreateAnimal } from '@modules/animals/domain/models/ICreateAnimal';
import { IPaginateAnimal } from '@modules/animals/domain/models/IPaginateAnimal';

export class AnimalsRepository implements IAnimalsRepository {
  constructor(private ormRepository: Repository<Animal>) {
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
  ): Promise<IPaginateAnimal> {
    if (isOng) {
      const animal = await this.ormRepository
        .createQueryBuilder('animal')
        .innerJoinAndSelect('animal.color', 'color')
        .innerJoinAndSelect('animal.specie', 'specie')
        .innerJoinAndSelect('animal.breed', 'breed')
        .innerJoinAndSelect('animal.animals_vaccine', 'animals_vaccine')
        .where('animal.user_id = :user_id', { user_id })
        .paginate();

      return animal as IPaginateAnimal;
    } else {
      const animal = await this.ormRepository
        .createQueryBuilder('animal')
        .innerJoinAndSelect('animal.color', 'color')
        .innerJoinAndSelect('animal.specie', 'specie')
        .innerJoinAndSelect('animal.breed', 'breed')
        .innerJoinAndSelect('animal.animals_vaccine', 'animals_vaccine')
        .paginate();

      return animal as IPaginateAnimal;
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
