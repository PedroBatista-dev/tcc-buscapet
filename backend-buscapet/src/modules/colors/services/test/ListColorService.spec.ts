import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import ListColorService from '../ListColorService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let listColor: ListColorService;

describe('ListColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeColorsRepository = new FakeColorsRepository();
    listColor = new ListColorService(fakeColorsRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await fakeColorsRepository.create({
      name: 'preto',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de listar as cores', async () => {
    const colors = await listColor.execute({ user_id: user.id });

    expect(colors.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'preto',
          user_id: user.id,
        }),
      ]),
    );
  });
});
