import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import ListBreedService from '../ListBreedService';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let listBreed: ListBreedService;

describe('ListBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    listBreed = new ListBreedService(fakeBreedsRepository);

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

    await fakeBreedsRepository.create({
      name: 'lulu',
      specie: specie,
      user_id: user.id,
    });
  });

  it('Deve ser capaz de listar as raças', async () => {
    const breeds = await listBreed.execute({ user_id: user.id, name: '' });

    expect(breeds).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'lulu',
          user_id: user.id,
        }),
      ]),
    );
  });
});
