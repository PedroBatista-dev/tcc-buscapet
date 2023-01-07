import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import CreateBreedService from '../CreateBreedService';
import { IBreed } from '../../domain/models/IBreed';
import UpdateBreedService from '../UpdateBreedService';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import CreateSpecieService from '../../../species/services/CreateSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let createBreed: CreateBreedService;
let updateBreed: UpdateBreedService;
let breed: IBreed;

describe('UpdateBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);

    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );

    fakeBreedsRepository = new FakeBreedsRepository();
    createBreed = new CreateBreedService(
      fakeUsersRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
    );
    updateBreed = new UpdateBreedService(
      fakeBreedsRepository,
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

    breed = await createBreed.execute({
      name: 'lulu',
      specie_id: specie.id,
      user_id: user.id,
    });

    await createBreed.execute({
      name: 'pitbull',
      specie_id: specie.id,
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de atualizar uma raça pelo id', async () => {
    const breedUp = await updateBreed.execute({
      id: breed.id,
      name: 'bulldog',
      specie_id: specie.id,
      user_id: user.id,
    });

    expect(breedUp).toEqual(
      expect.objectContaining({
        id: breed.id,
        name: 'bulldog',
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de atualizar uma raça com id inválido', async () => {
    expect(
      updateBreed.execute({
        id: 'abc',
        name: 'bulldog',
        specie_id: specie.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar uma raça com o nome ja cadastrado', async () => {
    expect(
      updateBreed.execute({
        id: breed.id,
        name: 'pitbull',
        specie_id: specie.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar uma raça com id de espécie inválido', async () => {
    expect(
      updateBreed.execute({
        id: breed.id,
        name: 'bulldog',
        specie_id: 'abc',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
