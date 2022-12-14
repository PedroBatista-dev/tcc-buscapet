import { IAnimalsVaccines } from '../models/IAnimalsVaccines';

export interface IAnimalsVaccinesRepository {
  findAllByAnimalId(animal_id: string): Promise<IAnimalsVaccines[]>;
  remove(animalsVaccines: IAnimalsVaccines[]): Promise<void>;
}
