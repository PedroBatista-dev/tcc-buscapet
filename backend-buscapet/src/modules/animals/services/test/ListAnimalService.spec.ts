import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../CreateAnimalService';
import ListAnimalService from '../ListAnimalService';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../../../vaccines/services/CreateVaccineService';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../../../species/services/CreateSpecieService';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import CreateBreedService from '../../../breeds/services/CreateBreedService';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../../../colors/services/CreateColorService';
import { IColor } from '../../../colors/domain/models/IColor';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;

let fakeColorsRepository: FakeColorsRepository;
let createColor: CreateColorService;
let color: IColor;

let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let createBreed: CreateBreedService;
let breed: IBreed;

let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let vaccine: IVaccine;

let fakeAnimalsRepository: FakeAnimalsRepository;
let createAnimal: CreateAnimalService;
let listAnimal: ListAnimalService;

describe('ListAnimal', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);

    fakeColorsRepository = new FakeColorsRepository();
    createColor = new CreateColorService(
      fakeUsersRepository,
      fakeColorsRepository,
    );

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

    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );

    fakeAnimalsRepository = new FakeAnimalsRepository();
    createAnimal = new CreateAnimalService(
      fakeUsersRepository,
      fakeColorsRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
      fakeVaccinesRepository,
      fakeAnimalsRepository,
    );
    listAnimal = new ListAnimalService(fakeAnimalsRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    color = await createColor.execute({
      name: 'preto',
      user_id: user.id,
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

    vaccine = await createVaccine.execute({
      name: 'v8',
      user_id: user.id,
    });

    await createAnimal.execute({
      name: 'Pingo',
      age: 12,
      sex: 'M',
      size: 'M',
      other_animals: 'Não',
      color_id: color.id,
      breed_id: breed.id,
      specie_id: specie.id,
      vaccines: [vaccine],
      user_id: user.id,
      isOng: user.isOng,
    });
  });

  it('Deveria ser capaz de listar os animais', async () => {
    const animals = await listAnimal.execute({
      user_id: user.id,
      isOng: user.isOng,
    });

    expect(animals.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pingo',
          user_id: user.id,
        }),
      ]),
    );
  });
});
