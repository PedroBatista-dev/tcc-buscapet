import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';
import { FakeUserTokensRepository } from '../../domain/repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordEmailService;
let user: IUser;

describe('SendForgotPasswordEmail', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPassword = new SendForgotPasswordEmailService(
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
  });

  it('Deve ser capaz de gerar um token para o usuário alterar sua senha', async () => {
    await sendForgotPassword.execute({ email: user.email });
  });

  it('Não deve ser capaz de gerar um token para o usuário com email inválido', async () => {
    expect(sendForgotPassword.execute({ email: 'abc' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
