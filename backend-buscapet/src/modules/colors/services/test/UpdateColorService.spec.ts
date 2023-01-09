import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../domain/models/IColor';
import UpdateColorService from '../UpdateColorService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let updateColor: UpdateColorService;
let color: IColor;

describe('UpdateColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeColorsRepository = new FakeColorsRepository();
    updateColor = new UpdateColorService(fakeColorsRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    color = await fakeColorsRepository.create({
      name: 'preto',
      user_id: user.id,
    });

    await fakeColorsRepository.create({
      name: 'caramelo',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de atualizar uma cor pelo id', async () => {
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

  it('Não deve ser capaz de atualizar uma cor com id inválido', async () => {
    expect(
      updateColor.execute({
        id: 'abc',
        name: 'branco',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma cor com o nome ja cadastrado', async () => {
    expect(
      updateColor.execute({
        id: color.id,
        name: 'caramelo',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
