import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;

describe('CreateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await createUser.execute({
      name: 'user 2',
      email: 'user2@email.com',
      password: 'user12',
      isOng: false,
      cpf: '810.389.660-86',
      cnpj: '',
    });
  });

  it('Deveria ser capaz de criar um novo usuário', async () => {
    expect(user).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar dois usuários com o mesmo email', async () => {
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

  it('Não deveria ser capaz de criar um usuário com o cnpj inválido', () => {
    expect(
      createUser.execute({
        name: 'user 3',
        email: 'user3@email.com',
        password: 'user123',
        isOng: true,
        cpf: '',
        cnpj: '65.658.849/0001-12',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um usuário com o cnpj já cadastrado', async () => {
    expect(
      createUser.execute({
        name: 'user 4',
        email: 'user4@email.com',
        password: 'user123',
        isOng: true,
        cpf: '',
        cnpj: '65.658.849/0001-00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um usuário com o cpf inválido', () => {
    expect(
      createUser.execute({
        name: 'user 5',
        email: 'user5@email.com',
        password: 'user123',
        isOng: false,
        cpf: '810.389.660-83',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um usuário com o cpf já cadastrado', async () => {
    expect(
      createUser.execute({
        name: 'user 6',
        email: 'user6@email.com',
        password: 'user123',
        isOng: false,
        cpf: '810.389.660-86',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
