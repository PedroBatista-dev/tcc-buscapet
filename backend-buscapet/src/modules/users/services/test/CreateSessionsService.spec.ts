import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionsService from '../CreateSessionsService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createSessions: CreateSessionsService;
let createUser: CreateUserService;

describe('CreateSessions', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createSessions = new CreateSessionsService(fakeUsersRepository);
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

  // it('Deveria ser capaz de efetuar o login do usuário', async () => {
  //   const login = await createSessions.execute({
  //     email: 'user@email.com',
  //     password: 'user123',
  //   });

  //   expect(login).toEqual(
  //     expect.objectContaining({
  //       name: 'user',
  //       email: 'user@email.com',
  //       isOng: true,
  //       cnpj: '65.658.849/0001-00',
  //     }),
  //   );
  // });

  it('Não deveria ser capaz de efetuar o login do usuário com email inválido', async () => {
    expect(
      createSessions.execute({
        email: 'user3@email.com',
        password: 'user123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
