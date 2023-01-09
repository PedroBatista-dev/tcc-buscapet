import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from '../ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUser: ListUserService;

describe('ListUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    listUser = new ListUserService(fakeUsersRepository);

    await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deve ser capaz de listar os usuários', async () => {
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
