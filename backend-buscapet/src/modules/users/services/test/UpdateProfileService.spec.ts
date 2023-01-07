import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../domain/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '../UpdateProfileService';
import CreateUserService from '../CreateUserService';
import { IUser } from '../../domain/models/IUser';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
let createUser: CreateUserService;
let userJuridico: IUser;
let userFisico: IUser;

describe('UpdateProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository);

    userJuridico = await createUser.execute({
      name: 'user juridico',
      email: 'userjuridico@email.com',
      password: 'userj123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    userFisico = await createUser.execute({
      name: 'user fisico',
      email: 'userfisico@email.com',
      password: 'userf123',
      isOng: false,
      cpf: '810.389.660-86',
      cnpj: '',
    });
  });

  it('Deveria ser capaz de atualizar o perfil de um usuário(pessoa jurídica)', async () => {
    const profile = await updateProfile.execute({
      user_id: userJuridico.id,
      name: 'user juridico updated',
      email: 'juridicoupdate@email.com',
      cnpj: '65.658.849/0001-00',
      cpf: '',
    });

    expect(profile).toEqual(
      expect.objectContaining({
        name: 'user juridico updated',
        email: 'juridicoupdate@email.com',
        isOng: true,
        cnpj: '65.658.849/0001-00',
      }),
    );
  });

  it('Deveria ser capaz de atualizar o perfil de um usuário(pessoa física)', async () => {
    const profile = await updateProfile.execute({
      user_id: userFisico.id,
      name: 'user fisico updated',
      email: 'updatefisico@email.com',
      cnpj: '',
      cpf: '810.389.660-86',
    });

    expect(profile).toEqual(
      expect.objectContaining({
        name: 'user fisico updated',
        email: 'updatefisico@email.com',
        isOng: false,
        cpf: '810.389.660-86',
      }),
    );
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com id inválido', async () => {
    expect(
      updateProfile.execute({
        user_id: 'abc',
        name: 'user updated',
        email: 'update@email.com',
        cpf: '',
        cnpj: '65.658.849/0001-00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com um email já cadastrado', async () => {
    expect(
      updateProfile.execute({
        user_id: userJuridico.id,
        name: 'user updated',
        email: 'userfisico@email.com',
        cpf: '',
        cnpj: '65.658.849/0001-00',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com um cnpj inválido', async () => {
    expect(
      updateProfile.execute({
        user_id: userJuridico.id,
        name: 'user updated',
        email: 'update@email.com',
        cpf: '',
        cnpj: '65.658.849/0001-22',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com um cnpj já cadastrado', async () => {
    await createUser.execute({
      name: 'user 2',
      email: 'user2@email.com',
      password: 'user12',
      isOng: true,
      cpf: '',
      cnpj: '31.219.750/0001-82',
    });

    expect(
      updateProfile.execute({
        user_id: userJuridico.id,
        name: 'user updated',
        email: 'update@email.com',
        cpf: '',
        cnpj: '31.219.750/0001-82',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com um cpf inválido', async () => {
    expect(
      updateProfile.execute({
        user_id: userFisico.id,
        name: 'user updated',
        email: 'update@email.com',
        cpf: '810.389.660-82',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar o perfil de um usuário com um cpf já cadastrado', async () => {
    await createUser.execute({
      name: 'user 2',
      email: 'user2@email.com',
      password: 'user12',
      isOng: false,
      cpf: '386.007.830-54',
      cnpj: '',
    });

    expect(
      updateProfile.execute({
        user_id: userFisico.id,
        name: 'user updated',
        email: 'update@email.com',
        cpf: '386.007.830-54',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
