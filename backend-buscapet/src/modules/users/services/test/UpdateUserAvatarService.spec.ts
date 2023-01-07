import 'reflect-metadata';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '../UpdateUserAvatarService';
import CreateUserService from '../CreateUserService';
import AppError from '../../../../shared/errors/AppError';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserAvatarService;
let createUser: CreateUserService;
let user: IUser;

describe('ShowProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUserAvatarService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });
  });

  it('Deveria ser capaz de atualizar o avatar de um usuário pelo seu id', async () => {
    const updateAvatar = await updateUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(updateAvatar).toEqual(
      expect.objectContaining({
        name: 'user',
        email: 'user@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
        avatar: 'avatar.png',
      }),
    );
  });

  it('Não deveria ser capaz de atualizar o avatar de um usuário com um id inválido', async () => {
    expect(
      updateUser.execute({ user_id: 'abcd', avatarFilename: 'avatar2.png' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
