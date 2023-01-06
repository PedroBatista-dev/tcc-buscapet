import AppError from '../../../../shared/errors/AppError';
import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });
  it('Deveria ser capaz de criar um novo usuário', async () => {
    const user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar dois usuários com o mesmo email', async () => {
    await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    expect(
      createUser.execute({
        name: 'user',
        email: 'user@email.com',
        password: 'user123',
        isOng: true,
        cpf: '',
        cnpj: '65.658.849/0001-00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
