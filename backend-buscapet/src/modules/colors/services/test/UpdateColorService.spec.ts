import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../CreateColorService';
import { IColor } from '../../domain/models/IColor';
import UpdateColorService from '../UpdateColorService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let updateColor: UpdateColorService;
let color: IColor;

describe('UpdateColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );
    updateColor = new UpdateColorService(fakeColorsRepository);

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

    await createColor.execute({
      name: 'caramelo',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de atualizar uma cor pelo id', async () => {
    const colorUp = await updateColor.execute({
      id: color.id,
      name: 'branco',
      user_id: user.id,
    });

    expect(colorUp).toEqual(
      expect.objectContaining({
        id: color.id,
        name: 'branco',
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de atualizar uma cor com id inválido', async () => {
    expect(
      updateColor.execute({
        id: 'abc',
        name: 'branco',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar uma cor com o nome ja cadastrado', async () => {
    expect(
      updateColor.execute({
        id: color.id,
        name: 'caramelo',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
