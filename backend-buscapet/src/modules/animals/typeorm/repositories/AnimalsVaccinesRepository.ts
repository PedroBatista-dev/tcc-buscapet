import { EntityRepository, Repository } from 'typeorm';
import AnimalsVaccines from '../entities/AnimalsVaccines';

@EntityRepository(AnimalsVaccines)
export class AnimalsVaccinesRepository extends Repository<AnimalsVaccines> {
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
