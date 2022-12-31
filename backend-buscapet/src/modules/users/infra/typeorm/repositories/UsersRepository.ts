import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> implements IUsersRepository {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByCnpj(cnpj: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        cnpj,
      },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }
}

export default UsersRepository;
