import { IBreedsRepository } from '../../../domain/repositories/IBreedsRepository';
import { ICreateBreed } from '../../../domain/models/ICreateBreed';
import { IPaginateBreed } from '../../../domain/models/IPaginateBreed';
import { v4 as uuidv4 } from 'uuid';
import Breed from '../../../infra/typeorm/entities/Breed';

export class FakeBreedsRepository implements IBreedsRepository {
  private breeds: Breed[] = [];

  public async create({ name, user_id }: ICreateBreed): Promise<Breed> {
    const breed = new Breed();

    breed.id = uuidv4();
    breed.name = name;
    breed.user_id = user_id;

    this.breeds.push(breed);

    return breed;
  }

  public async save(breed: Breed): Promise<Breed> {
    Object.assign(this.breeds, breed);

    return breed;
  }

  public async remove(breed: Breed): Promise<void> {
    this.breeds.splice(
      this.breeds.findIndex(vac => {
        vac.id === breed.id;
      }),
      1,
    );
  }

  public async findAll(user_id: string): Promise<IPaginateBreed> {
    const breeds = this.breeds.filter(breed => breed.user_id === user_id);

    const breedsPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: 1,
      next_page: 1,
      data: breeds,
    };

    return breedsPaginate;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Breed | undefined> {
    const breed = this.breeds.find(
      breed => breed.name === name && breed.user_id === user_id,
    );
    return breed;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Breed | undefined> {
    const breed = this.breeds.find(
      breed => breed.id === id && breed.user_id === user_id,
    );
    return breed;
  }
}
