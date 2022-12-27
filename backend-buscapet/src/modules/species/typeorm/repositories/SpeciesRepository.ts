import Specie from '../entities/Specie';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Specie)
export class SpeciesRepository extends Repository<Specie> {
  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Specie | undefined> {
    const specie = this.findOne({
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
    const specie = await this.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['breeds'],
    });

    return specie;
  }
}
