import UserToken from '../../../infra/typeorm/entities/UserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';
import { v4 as uuidv4 } from 'uuid';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async save(userToken: UserToken): Promise<UserToken> {
    const findIndex = this.userTokens.findIndex(
      findUserToken => findUserToken.id === userToken.id,
    );
    this.userTokens[findIndex] = userToken;

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      userToken => userToken.token === token,
    );
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = uuidv4();
    userToken.token = uuidv4();
    userToken.user_id = user_id;

    this.userTokens.push(userToken);

    return userToken;
  }
}
