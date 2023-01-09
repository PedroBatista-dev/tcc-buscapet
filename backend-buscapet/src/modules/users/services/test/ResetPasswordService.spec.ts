import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '../ResetPasswordService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';
import { FakeUserTokensRepository } from '../../domain/repositories/fakes/FakeUserTokensRepository';
import { IUserToken } from '../../domain/models/IUserToken';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let user: IUser;
let userToken: IUserToken;

describe('ResetPassword', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    userToken = await fakeUserTokensRepository.generate(user.id);
  });

  it('Deve ser capaz de resetar a senha de um usuário com token', async () => {
    expect(
      resetPassword.execute({ token: userToken.token, password: 'user1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de resetar a senha de um usuário com token inválido', async () => {
    expect(
      resetPassword.execute({ token: 'abc', password: 'user1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
