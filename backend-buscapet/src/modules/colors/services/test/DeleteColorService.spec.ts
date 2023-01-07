import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../CreateColorService';
import { IColor } from '../../domain/models/IColor';
import DeleteColorService from '../DeleteColorService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let deleteColor: DeleteColorService;
let color: IColor;

describe('DeleteColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );
    deleteColor = new DeleteColorService(fakeColorsRepository);

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

  it('Deveria ser capaz de deletar uma cor pelo id', async () => {
    await deleteColor.execute({ id: color.id, user_id: user.id });
  });

  it('Não deveria ser capaz de deletar uma cor com id inválido', async () => {
    expect(
      deleteColor.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
