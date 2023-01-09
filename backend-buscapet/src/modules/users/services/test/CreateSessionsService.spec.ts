import { IUser } from '../../domain/models/IUser';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;
let user: IUser;

describe('CreateSessions', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deveria ser capaz de autenticar', async () => {
    const response = await createSession.execute({
      email: 'user@email.com',
      password: 'user123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Não deve ser capaz de autenticar com email errado', async () => {
    expect(
      createSession.execute({
        email: 'teste@email.com',
        password: 'user123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de autenticar com senha errada', async () => {
    expect(
      createSession.execute({
        email: 'user@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
