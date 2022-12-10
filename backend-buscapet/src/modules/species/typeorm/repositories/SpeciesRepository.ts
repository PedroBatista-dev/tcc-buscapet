import Specie from '../entities/Specie';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Specie)
export class SpeciesRepository extends Repository<Specie> {
  public async findByName(name: string): Promise<Specie | undefined> {
    const specie = this.findOne({
      where: {
        name,
      },
    });

    return specie;
  }

  public async findById(id: string): Promise<Specie | undefined> {
    const specie = await this.findOne({
      where: {
        id,
      },
    });

    return specie;
  }
}
