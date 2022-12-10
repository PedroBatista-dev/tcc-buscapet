import Breed from '../entities/Breed';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Breed)
export class BreedsRepository extends Repository<Breed> {
  public async findByName(name: string): Promise<Breed | undefined> {
    const breed = this.findOne({
      where: {
        name,
      },
    });

    return breed;
  }

  public async findById(id: string): Promise<Breed | undefined> {
    const breed = await this.findOne({
      where: {
        id,
      },
    });

    return breed;
  }
}
