import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from '../ListUserService';

describe('ListUser', () => {
  it('Deveria ser capaz de listar todos os usuários', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const listUser = new ListUserService(fakeUsersRepository);

    const users = await listUser.execute();

    console.log(users);

    expect(users);
  });
});
