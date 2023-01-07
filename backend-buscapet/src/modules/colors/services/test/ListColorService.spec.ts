import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../CreateColorService';
import ListColorService from '../ListColorService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let listColor: ListColorService;

describe('ListColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );
    listColor = new ListColorService(fakeColorsRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await createColor.execute({
      name: 'preto',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de listar as cores', async () => {
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
