import { IAnimalsVaccinesRepository } from '@modules/animals/domain/repositories/IAnimalsvaccinesRepository';
import { getRepository, Repository } from 'typeorm';
import AnimalsVaccines from '../entities/AnimalsVaccines';

export class AnimalsVaccinesRepository implements IAnimalsVaccinesRepository {
  private ormRepository: Repository<AnimalsVaccines>;

  constructor() {
    this.ormRepository = getRepository(AnimalsVaccines);
  }

  public async findAllByAnimalId(
    animal_id: string,
  ): Promise<AnimalsVaccines[]> {
    const existsAnimalsVaccines = await this.ormRepository.find({
      where: {
        animal_id,
      },
    });

    return existsAnimalsVaccines;
  }

  public async remove(animalsVaccines: AnimalsVaccines[]): Promise<void> {
    await this.ormRepository.remove(animalsVaccines);
  }
}
