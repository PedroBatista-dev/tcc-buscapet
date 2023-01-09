import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../CreateColorService';
import { IColor } from '../../domain/models/IColor';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let color: IColor;

describe('CreateColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );

    user = await fakeUsersRepository.create({
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

  it('Deve ser capaz de criar uma nova cor', async () => {
    expect(color).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma cor com id de usuário inválido', async () => {
    expect(
      createColor.execute({
        name: 'caramelo',
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar uma cor com o nome ja cadastrado', async () => {
    expect(
      createColor.execute({
        name: 'preto',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
