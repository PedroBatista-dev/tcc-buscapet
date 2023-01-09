import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../domain/models/IBreed';
import UpdateBreedService from '../UpdateBreedService';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let updateBreed: UpdateBreedService;
let breed: IBreed;

describe('UpdateBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    updateBreed = new UpdateBreedService(
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

    breed = await fakeBreedsRepository.create({
      name: 'lulu',
      specie: specie,
      user_id: user.id,
    });

    await fakeBreedsRepository.create({
      name: 'pitbull',
      specie: specie,
      user_id: user.id,
    });
  });

  it('Deve ser capaz de atualizar uma raça pelo id', async () => {
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

  it('Não deve ser capaz de atualizar uma raça com id inválido', async () => {
    expect(
      updateBreed.execute({
        id: 'abc',
        name: 'bulldog',
        specie_id: specie.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma raça com o nome ja cadastrado', async () => {
    expect(
      updateBreed.execute({
        id: breed.id,
        name: 'pitbull',
        specie_id: specie.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma raça com id de espécie inválido', async () => {
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
