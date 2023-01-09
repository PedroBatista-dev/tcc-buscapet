import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../domain/models/IColor';
import ShowColorService from '../ShowColorService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let showColor: ShowColorService;
let color: IColor;

describe('ShowColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeColorsRepository = new FakeColorsRepository();
    showColor = new ShowColorService(fakeColorsRepository);

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
  });

  it('Deve ser capaz de mostrar uma cor pelo id', async () => {
    const idColor = await showColor.execute({
      id: color.id,
      user_id: user.id,
    });

    expect(idColor).toEqual(
      expect.objectContaining({
        name: 'preto',
        user_id: user.id,
      }),
    );
  });

  it('Não deve ser capaz de mostrar uma cor com id inválido', async () => {
    expect(
      showColor.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
