import { IAnimal } from '../models/IAnimal';

export interface IAnimalsRepository {
  findByName(name: string, user_id: string): Promise<IAnimal | undefined>;
  findById(id: string, user_id: string): Promise<IAnimal | undefined>;
}
