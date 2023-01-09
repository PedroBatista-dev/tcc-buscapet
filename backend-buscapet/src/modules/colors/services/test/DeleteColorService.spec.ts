import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeColorsRepository } from '../../domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../domain/models/IColor';
import DeleteColorService from '../DeleteColorService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeColorsRepository: FakeColorsRepository;
let deleteColor: DeleteColorService;
let color: IColor;

describe('DeleteColor', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeColorsRepository = new FakeColorsRepository();
    deleteColor = new DeleteColorService(fakeColorsRepository);

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

  it('Deve ser capaz de deletar uma cor pelo id', async () => {
    await deleteColor.execute({ id: color.id, user_id: user.id });
  });

  it('Não deve ser capaz de deletar uma cor com id inválido', async () => {
    expect(
      deleteColor.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
