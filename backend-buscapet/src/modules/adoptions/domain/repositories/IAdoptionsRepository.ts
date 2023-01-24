import { IAdoption } from '../models/IAdoption';
import { ICreateAdoption } from '../models/ICreateAdoption';

export interface IAdoptionsRepository {
  findById(
    id: string,
    user_id: string,
    isOng: boolean,
  ): Promise<IAdoption | undefined>;
  findByAnimalOngAdopter(
    animal_id: string,
    adopter_id: string,
    ong_id: string,
  ): Promise<IAdoption | undefined>;
  findAll(
    user_id: string,
    status: string,
    isOng: boolean,
  ): Promise<IAdoption[]>;
  create(data: ICreateAdoption): Promise<IAdoption>;
  save(customer: IAdoption): Promise<IAdoption>;
  remove(customer: IAdoption): Promise<void>;
}
