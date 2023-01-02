import { IAnimal } from '../models/IAnimal';
import { ICreateAnimal } from '../models/ICreateAnimal';
import { IPaginateAnimal } from '../models/IPaginateAnimal';

export interface IAnimalsRepository {
  findByName(name: string, user_id: string): Promise<IAnimal | undefined>;
  findById(id: string, user_id: string): Promise<IAnimal | undefined>;
  findByIdAll(id: string): Promise<IAnimal | undefined>;
  findAll(user_id: string, isOng: boolean): Promise<IPaginateAnimal>;
  create(data: ICreateAnimal): Promise<IAnimal>;
  save(customer: IAnimal): Promise<IAnimal>;
  remove(customer: IAnimal): Promise<void>;
}
