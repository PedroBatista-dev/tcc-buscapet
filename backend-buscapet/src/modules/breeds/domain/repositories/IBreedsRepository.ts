import { IBreed } from '../models/IBreed';
import { ICreateBreed } from '../models/ICreateBreed';
import { IPaginateBreed } from '../models/IPaginateBreed';

export interface IBreedsRepository {
  findByName(name: string, user_id: string): Promise<IBreed | undefined>;
  findById(id: string, user_id: string): Promise<IBreed | undefined>;
  findAll(user_id: string): Promise<IPaginateBreed>;
  create(data: ICreateBreed): Promise<IBreed>;
  save(customer: IBreed): Promise<IBreed>;
  remove(customer: IBreed): Promise<void>;
}
