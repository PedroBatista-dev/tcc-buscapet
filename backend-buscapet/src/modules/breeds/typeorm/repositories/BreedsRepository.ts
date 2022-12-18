import Breed from '../entities/Breed';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Breed)
export class BreedsRepository extends Repository<Breed> {
  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Breed | undefined> {
    const breed = this.findOne({
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
    const breed = await this.findOne({
      where: {
        id,
        user_id,
      },
      relations: ['specie'],
    });

    return breed;
  }
}
