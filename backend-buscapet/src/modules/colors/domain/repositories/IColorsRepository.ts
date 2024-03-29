import { IColor } from '../models/IColor';
import { ICreateColor } from '../models/ICreateColor';

export interface IColorsRepository {
  findByName(name: string, user_id: string): Promise<IColor | undefined>;
  findById(id: string, user_id: string): Promise<IColor | undefined>;
  findAll(user_id: string, name: string): Promise<IColor[]>;
  create(data: ICreateColor): Promise<IColor>;
  save(customer: IColor): Promise<IColor>;
  remove(customer: IColor): Promise<void>;
}
