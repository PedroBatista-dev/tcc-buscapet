import { IAnimal } from '@modules/animals/domain/models/IAnimal';
import { IUser } from '@modules/users/domain/models/IUser';

export interface ICreateAdoption {
  status: string;
  animal: IAnimal;
  ong: IUser;
  adopter: IUser;
}
