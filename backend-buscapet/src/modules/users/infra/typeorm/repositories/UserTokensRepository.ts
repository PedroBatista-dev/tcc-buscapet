import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  constructor(private ormRepository: Repository<UserToken>) {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }

  public async save(userToken: UserToken): Promise<UserToken> {
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
