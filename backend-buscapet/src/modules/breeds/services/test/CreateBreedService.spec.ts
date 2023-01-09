import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import CreateBreedService from '../CreateBreedService';
import { IBreed } from '../../domain/models/IBreed';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let createBreed: CreateBreedService;
let breed: IBreed;

describe('CreateBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    createBreed = new CreateBreedService(
      fakeUsersRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await fakeSpeciesRepository.create({
      name: 'canina',
      user_id: user.id,
    });

    breed = await createBreed.execute({
      name: 'lulu',
      specie_id: specie.id,
      user_id: user.id,
    });
  });

  it('Deve ser capaz de criar uma nova raça', async () => {
    expect(breed).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma raça com id de usuário inválido', async () => {
    expect(
      createBreed.execute({
        name: 'pitbull',
        specie_id: specie.id,
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar uma raça com o nome ja cadastrado', async () => {
    expect(
      createBreed.execute({
        name: 'lulu',
        specie_id: specie.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar uma raça com id de espécie inválido', async () => {
    expect(
      createBreed.execute({
        name: 'pitbull',
        specie_id: 'abc',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
