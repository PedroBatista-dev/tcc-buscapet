import { IAnimal } from '../models/IAnimal';
import { ICreateAnimal } from '../models/ICreateAnimal';

export interface IAnimalsRepository {
  findByName(name: string, user_id: string): Promise<IAnimal | undefined>;
  findById(id: string, user_id: string): Promise<IAnimal | undefined>;
  findByIdAll(id: string): Promise<IAnimal | undefined>;
  findAll(user_id: string, isOng: boolean, name: string): Promise<IAnimal[]>;
  findDashboard(user_id: string, isOng: boolean, text: string): Promise<any>;
  create(data: ICreateAnimal): Promise<IAnimal>;
  save(customer: IAnimal): Promise<IAnimal>;
  remove(customer: IAnimal): Promise<void>;
}
