import { ICreateVaccine } from '../models/ICreateVaccine';
import { IVaccine } from '../models/IVaccine';

interface IFindVaccines {
  id: string;
}

export interface IVaccinesRepository {
  findByName(name: string, user_id: string): Promise<IVaccine | undefined>;
  findById(id: string, user_id: string): Promise<IVaccine | undefined>;
  findAllByIds(vaccines: IFindVaccines[], user_id: string): Promise<IVaccine[]>;
  findAll(user_id: string, name: string): Promise<IVaccine[]>;
  create(data: ICreateVaccine): Promise<IVaccine>;
  save(customer: IVaccine): Promise<IVaccine>;
  remove(customer: IVaccine): Promise<void>;
}
