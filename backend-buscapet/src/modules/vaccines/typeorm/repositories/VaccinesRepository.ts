import Vaccine from '../entities/Vaccine';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Vaccine)
export class VaccinesRepository extends Repository<Vaccine> {
  public async findByName(name: string): Promise<Vaccine | undefined> {
    const vaccine = this.findOne({
      where: {
        name,
      },
    });

    return vaccine;
  }

  public async findById(id: string): Promise<Vaccine | undefined> {
    const vaccine = await this.findOne({
      where: {
        id,
      },
    });

    return vaccine;
  }
}
