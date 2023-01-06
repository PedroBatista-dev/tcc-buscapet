import Specie from '../entities/Specie';
import { getRepository, Repository } from 'typeorm';
import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';
import { ICreateSpecie } from '@modules/species/domain/models/ICreateSpecie';
import { IPaginateSpecie } from '@modules/species/domain/models/IPaginateSpecie';

export class SpeciesRepository implements ISpeciesRepository {
  private ormRepository: Repository<Specie>;

  constructor() {
    this.ormRepository = getRepository(Specie);
  }

  public async create({ name, user_id }: ICreateSpecie): Promise<Specie> {
    const specie = this.ormRepository.create({ name, user_id });

    await this.ormRepository.save(specie);

    return specie;
  }

  public async save(specie: Specie): Promise<Specie> {
    await this.ormRepository.save(specie);

    return specie;
  }

  public async remove(specie: Specie): Promise<void> {
    await this.ormRepository.remove(specie);
  }

  public async findAll(user_id: string): Promise<IPaginateSpecie> {
    const specie = await this.ormRepository
      .createQueryBuilder('specie')
      .leftJoinAndSelect('specie.breeds', 'breed')
      .where('specie.user_id = :user_id', { user_id })
      .paginate();

    return specie as IPaginateSpecie;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Specie | undefined> {
    const specie = this.ormRepository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return specie;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Specie | undefined> {
    const specie = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['breeds'],
    });

    return specie;
  }
}
