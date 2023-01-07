import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '../ShowProfileService';
import CreateUserService from '../CreateUserService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
let createUser: CreateUserService;
let user: IUser;

describe('ShowProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deveria ser capaz de exibir um usuário pelo seu id', async () => {
    const showUser = await showProfile.execute({ user_id: user.id });

    expect(showUser).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Não deveria ser capaz de exibir um usuário com o id inválido', async () => {
    expect(showProfile.execute({ user_id: 'abcd' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
