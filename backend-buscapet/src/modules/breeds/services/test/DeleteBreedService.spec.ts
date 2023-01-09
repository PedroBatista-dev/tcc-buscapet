import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeBreedsRepository } from '../../domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../domain/models/IBreed';
import DeleteBreedService from '../DeleteBreedService';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let deleteBreed: DeleteBreedService;
let breed: IBreed;

describe('DeleteBreed', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    deleteBreed = new DeleteBreedService(fakeBreedsRepository);

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

  it('Deve ser capaz de deletar uma raça pelo id', async () => {
    await deleteBreed.execute({ id: breed.id, user_id: user.id });
  });

  it('Não deve ser capaz de deletar uma raça com id inválido', async () => {
    expect(
      deleteBreed.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
