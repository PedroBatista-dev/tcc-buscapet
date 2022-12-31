import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findByCnpj(cnpj: string): Promise<IUser | undefined>;
  findByCpf(cpf: string): Promise<IUser | undefined>;
}
