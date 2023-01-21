import { IBreed } from '../models/IBreed';
import { ICreateBreed } from '../models/ICreateBreed';

export interface IBreedsRepository {
  findByName(name: string, user_id: string): Promise<IBreed | undefined>;
  findById(id: string, user_id: string): Promise<IBreed | undefined>;
  findAll(user_id: string, name: string): Promise<IBreed[]>;
  create(data: ICreateBreed): Promise<IBreed>;
  save(customer: IBreed): Promise<IBreed>;
  remove(customer: IBreed): Promise<void>;
}
