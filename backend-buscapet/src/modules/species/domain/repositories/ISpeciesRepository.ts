import { ICreateSpecie } from '../models/ICreateSpecie';
import { IPaginateSpecie } from '../models/IPaginateSpecie';
import { ISpecie } from '../models/ISpecie';

export interface ISpeciesRepository {
  findByName(name: string, user_id: string): Promise<ISpecie | undefined>;
  findById(id: string, user_id: string): Promise<ISpecie | undefined>;
  findAll(user_id: string): Promise<IPaginateSpecie>;
  create(data: ICreateSpecie): Promise<ISpecie>;
  save(customer: ISpecie): Promise<ISpecie>;
  remove(customer: ISpecie): Promise<void>;
}
