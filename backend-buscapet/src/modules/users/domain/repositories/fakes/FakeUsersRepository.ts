import { v4 as uuidv4 } from 'uuid';
import User from '../../../infra/typeorm/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
    isOng,
    cpf,
    cnpj,
  }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    user.isOng = isOng;
    if (cpf) user.cpf = cpf;
    if (cnpj) user.cnpj = cnpj;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async findByCnpj(cnpj: string): Promise<User | undefined> {
    const user = this.users.find(user => user.cnpj === cnpj);
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find(user => user.cpf === cpf);
    return user;
  }
}
