import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from '../ListUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;
let createUser: CreateUserService;

describe('ListUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    listUser = new ListUserService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deveria ser capaz de listar os usuários', async () => {
    const users = await listUser.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'user',
          email: 'user@email.com',
          isOng: true,
          cnpj: '65.658.849/0001-00',
        }),
      ]),
    );
  });
});
