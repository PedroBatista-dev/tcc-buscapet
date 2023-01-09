import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../domain/models/IBreed';
import ShowBreedService from '../ShowBreedService';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let showBreed: ShowBreedService;
let breed: IBreed;

describe('ShowBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    showBreed = new ShowBreedService(fakeBreedsRepository);

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
  });

  it('Deve ser capaz de mostrar uma raça pelo id', async () => {
    const idBreed = await showBreed.execute({
      id: breed.id,
      user_id: user.id,
    });

    expect(idBreed).toEqual(
      expect.objectContaining({
        name: 'lulu',
        user_id: user.id,
      }),
    );
  });

  it('Não deve ser capaz de mostrar uma raça com id inválido', async () => {
    expect(
      showBreed.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
