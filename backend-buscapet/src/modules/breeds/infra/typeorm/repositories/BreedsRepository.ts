import Breed from '../entities/Breed';
import { getRepository, Repository } from 'typeorm';
import { IBreedsRepository } from '@modules/breeds/domain/repositories/IBreedsRepository';
import { ICreateBreed } from '@modules/breeds/domain/models/ICreateBreed';

export class BreedsRepository implements IBreedsRepository {
  constructor(private ormRepository: Repository<Breed>) {
    this.ormRepository = getRepository(Breed);
  }

  public async create({ name, specie, user_id }: ICreateBreed): Promise<Breed> {
    const breed = this.ormRepository.create({ name, specie, user_id });

    await this.ormRepository.save(breed);

    return breed;
  }

  public async save(breed: Breed): Promise<Breed> {
    await this.ormRepository.save(breed);

    return breed;
  }

  public async remove(breed: Breed): Promise<void> {
    await this.ormRepository.remove(breed);
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Breed | undefined> {
    const breed = this.ormRepository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return breed;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Breed | undefined> {
    const breed = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['specie'],
    });

    return breed;
  }
}
