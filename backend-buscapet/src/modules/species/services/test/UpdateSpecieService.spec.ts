import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../CreateSpecieService';
import { ISpecie } from '../../domain/models/ISpecie';
import UpdateSpecieService from '../UpdateSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let updateSpecie: UpdateSpecieService;
let specie: ISpecie;

describe('UpdateSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );
    updateSpecie = new UpdateSpecieService(fakeSpeciesRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await createSpecie.execute({
      name: 'canino',
      user_id: user.id,
    });

    await createSpecie.execute({
      name: 'roedor',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de atualizar uma espécie pelo id', async () => {
    const specieUp = await updateSpecie.execute({
      id: specie.id,
      name: 'felino',
      user_id: user.id,
    });

    expect(specieUp).toEqual(
      expect.objectContaining({
        id: specie.id,
        name: 'felino',
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de atualizar uma espécie com id inválido', async () => {
    expect(
      updateSpecie.execute({
        id: 'abc',
        name: 'canino',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar uma espécie com o nome ja cadastrado', async () => {
    expect(
      updateSpecie.execute({
        id: specie.id,
        name: 'roedor',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
