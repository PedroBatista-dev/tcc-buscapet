import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '../ShowProfileService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
let user: IUser;

describe('ShowProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deve ser capaz de exibir um usuário pelo seu id', async () => {
    const showUser = await showProfile.execute({ user_id: user.id });

    expect(showUser).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Não deve ser capaz de exibir um usuário com o id inválido', async () => {
    expect(showProfile.execute({ user_id: 'abcd' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
