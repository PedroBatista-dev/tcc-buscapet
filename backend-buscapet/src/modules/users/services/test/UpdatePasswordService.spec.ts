import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import UpdatePasswordService from '../UpdatePasswordService';
import CreateUserService from '../CreateUserService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let updatePassword: UpdatePasswordService;
let createUser: CreateUserService;
let user: IUser;

describe('ShowProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    updatePassword = new UpdatePasswordService(fakeUsersRepository);
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

  it('Deveria ser capaz de atualizar a senha de um usuário pelo seu id', async () => {
    const updateAvatar = await updatePassword.execute({
      user_id: user.id,
      password: 'user12',
      old_password: 'user123',
    });

    expect(updateAvatar).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Não deveria ser capaz de atualizar a senha de um usuário com um id inválido', () => {
    expect(
      updatePassword.execute({
        user_id: 'abcd',
        password: 'user12',
        old_password: 'user123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
