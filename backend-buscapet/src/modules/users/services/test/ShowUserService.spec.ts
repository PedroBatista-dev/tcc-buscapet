import { IUser } from '../../../users/domain/models/IUser';
import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ShowUserService from '../ShowUserService';
import AppError from '../../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    showUser = new ShowUserService(fakeUsersRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deve ser capaz de mostrar um usuário pelo id', async () => {
    const userId = await showUser.execute({ id: user.id });

    expect(userId).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Não deve ser capaz de mostrar um usuário com id inválido', async () => {
    expect(showUser.execute({ id: 'abc' })).rejects.toBeInstanceOf(AppError);
  });
});
