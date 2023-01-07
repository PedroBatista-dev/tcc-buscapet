import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../CreateColorService';
import { IColor } from '../../domain/models/IColor';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let color: IColor;

describe('CreateColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    color = await createColor.execute({
      name: 'preto',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de criar uma nova cor', async () => {
    expect(color).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar uma cor com id de usuário inválido', async () => {
    expect(
      createColor.execute({
        name: 'caramelo',
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar uma cor com o nome ja cadastrado', async () => {
    expect(
      createColor.execute({
        name: 'preto',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
