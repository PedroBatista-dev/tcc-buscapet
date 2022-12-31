import Animal from '../entities/Animal';
import { EntityRepository, Repository } from 'typeorm';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';

@EntityRepository(Animal)
export class AnimalsRepository
  extends Repository<Animal>
  implements IAnimalsRepository
{
  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Animal | undefined> {
    const animal = this.findOne({
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
    const animal = await this.findOne({
      where: {
        id,
        user_id,
      },
    });

    return animal;
  }
}
