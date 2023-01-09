import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import UpdatePasswordService from '../UpdatePasswordService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updatePassword: UpdatePasswordService;
let user: IUser;

describe('UpdatePassword', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updatePassword = new UpdatePasswordService(
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

  it('Deve ser capaz de atualizar a senha de um usuário pelo seu id', async () => {
    const updateAvatar = await updatePassword.execute({
      user_id: user.id,
      password: 'user12',
      old_password: 'user123',
    });

    expect(updateAvatar).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: user.isOng,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Não deve ser capaz de atualizar a senha de um usuário com um id inválido', () => {
    expect(
      updatePassword.execute({
        user_id: 'abcd',
        password: 'user12',
        old_password: 'user123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar a senha de um usuário com senha diferente da senha antiga', () => {
    expect(
      updatePassword.execute({
        user_id: user.id,
        password: 'user1212',
        old_password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
