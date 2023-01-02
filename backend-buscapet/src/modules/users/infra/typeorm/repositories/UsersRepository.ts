import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  constructor(private ormRepository: Repository<User>) {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    isOng,
    cpf,
    cnpj,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      isOng,
      cpf,
      cnpj,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByCnpj(cnpj: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        cnpj,
      },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }
}

export default UsersRepository;