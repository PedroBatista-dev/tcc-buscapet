import { IAnimalsVaccinesRepository } from '@modules/animals/domain/repositories/IAnimalsvaccinesRepository';
import { EntityRepository, Repository } from 'typeorm';
import AnimalsVaccines from '../entities/AnimalsVaccines';

@EntityRepository(AnimalsVaccines)
export class AnimalsVaccinesRepository
  extends Repository<AnimalsVaccines>
  implements IAnimalsVaccinesRepository
{
  public async findAllByAnimalId(
    animal_id: string,
  ): Promise<AnimalsVaccines[]> {
    const existsAnimalsVaccines = await this.find({
      where: {
        animal_id,
      },
    });

    return existsAnimalsVaccines;
  }
}
