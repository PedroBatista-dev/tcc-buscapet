import { ISpeciesRepository } from '../../../domain/repositories/ISpeciesRepository';
import { ICreateSpecie } from '../../../domain/models/ICreateSpecie';
import { IPaginateSpecie } from '../../../domain/models/IPaginateSpecie';
import { v4 as uuidv4 } from 'uuid';
import Specie from '../../../infra/typeorm/entities/Specie';

export class FakeSpeciesRepository implements ISpeciesRepository {
  private species: Specie[] = [];

  public async create({ name, user_id }: ICreateSpecie): Promise<Specie> {
    const specie = new Specie();

    specie.id = uuidv4();
    specie.name = name;
    specie.user_id = user_id;

    this.species.push(specie);

    return specie;
  }

  public async save(specie: Specie): Promise<Specie> {
    Object.assign(this.species, specie);

    return specie;
  }

  public async remove(specie: Specie): Promise<void> {
    this.species.splice(
      this.species.findIndex(vac => {
        vac.id === specie.id;
      }),
      1,
    );
  }

  public async findAll(user_id: string): Promise<IPaginateSpecie> {
    const species = this.species.filter(specie => specie.user_id === user_id);

    const speciesPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: 1,
      next_page: 1,
      data: species,
    };

    return speciesPaginate;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Specie | undefined> {
    const specie = this.species.find(
      specie => specie.name === name && specie.user_id === user_id,
    );
    return specie;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Specie | undefined> {
    const specie = this.species.find(
      specie => specie.id === id && specie.user_id === user_id,
    );
    return specie;
  }
}
