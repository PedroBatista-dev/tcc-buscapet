import { IAnimalsVaccinesRepository } from '../IAnimalsvaccinesRepository';
import AnimalsVaccines from '../../../infra/typeorm/entities/AnimalsVaccines';

export class FakeAnimalsVaccinesRepository
  implements IAnimalsVaccinesRepository
{
  private animalsVaccines: AnimalsVaccines[] = [];

  public async remove(): Promise<void> {
    this.animalsVaccines = [];
  }

  public async findAllByAnimalId(
    animal_id: string,
  ): Promise<AnimalsVaccines[]> {
    const animalsVaccines = this.animalsVaccines.filter(
      animalVaccines => animalVaccines.animal_id === animal_id,
    );
    return animalsVaccines;
  }
}
