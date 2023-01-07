import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../CreateSpecieService';
import { ISpecie } from '../../domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let specie: ISpecie;

describe('CreateSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await createSpecie.execute({
      name: 'canina',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de criar uma nova espécie', async () => {
    expect(specie).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar uma espécie com id de usuário inválido', async () => {
    expect(
      createSpecie.execute({
        name: 'felina',
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar uma espécie com o nome ja cadastrado', async () => {
    expect(
      createSpecie.execute({
        name: 'canina',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
