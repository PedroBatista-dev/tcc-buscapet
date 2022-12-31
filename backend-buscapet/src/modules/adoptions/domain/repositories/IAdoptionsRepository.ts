import { IAdoption } from '../models/IAdoption';
import { ICreateAdoption } from '../models/ICreateAdoption';

export interface IAdoptionsRepository {
  findById(
    id: string,
    user_id: string,
    isOng: boolean,
  ): Promise<IAdoption | undefined>;
  create(data: ICreateAdoption): Promise<IAdoption>;
  save(customer: IAdoption): Promise<IAdoption>;
  remove(customer: IAdoption): Promise<void>;
}
