import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../CreateAnimalService';
import { IAnimal } from '../../domain/models/IAnimal';
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
let specieF: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let createBreed: CreateBreedService;
let breed: IBreed;
let breedV: IBreed;

let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let vaccine: IVaccine;

let fakeAnimalsRepository: FakeAnimalsRepository;
let createAnimal: CreateAnimalService;
let animal: IAnimal;

describe('CreateAnimal', () => {
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

    specieF = await createSpecie.execute({
      name: 'felina',
      user_id: user.id,
    });

    breedV = await createBreed.execute({
      name: 'vira-lata',
      specie_id: specieF.id,
      user_id: user.id,
    });

    vaccine = await createVaccine.execute({
      name: 'v8',
      user_id: user.id,
    });

    animal = await createAnimal.execute({
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

  it('Deveria ser capaz de criar um novo animal', async () => {
    expect(animal).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar um animal com id de usuário inválido', async () => {
    expect(
      createAnimal.execute({
        name: 'Pingo',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: breed.id,
        specie_id: specie.id,
        vaccines: [vaccine],
        user_id: 'abc',
        isOng: user.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com id de cor inválido', async () => {
    expect(
      createAnimal.execute({
        name: 'Pingo',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: 'abc',
        breed_id: breed.id,
        specie_id: specie.id,
        vaccines: [vaccine],
        user_id: user.id,
        isOng: user.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com id de espécie inválido', async () => {
    expect(
      createAnimal.execute({
        name: 'Pingo',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: breed.id,
        specie_id: 'abc',
        vaccines: [vaccine],
        user_id: user.id,
        isOng: user.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com id de raça inválido', async () => {
    expect(
      createAnimal.execute({
        name: 'Pingo',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: 'abc',
        specie_id: specie.id,
        vaccines: [vaccine],
        user_id: user.id,
        isOng: user.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com o nome ja cadastrado', async () => {
    expect(
      createAnimal.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com o usuário que não é ONG', async () => {
    expect(
      createAnimal.execute({
        name: 'Bolinha',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: breed.id,
        specie_id: specie.id,
        vaccines: [vaccine],
        user_id: user.id,
        isOng: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com uma raça que não pertence a espécie', async () => {
    expect(
      createAnimal.execute({
        name: 'Bolinha',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: breedV.id,
        specie_id: specie.id,
        vaccines: [vaccine],
        user_id: user.id,
        isOng: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de criar um animal com vacina inválida', async () => {
    expect(
      createAnimal.execute({
        name: 'Bolinha',
        age: 12,
        sex: 'M',
        size: 'M',
        other_animals: 'Não',
        color_id: color.id,
        breed_id: breed.id,
        specie_id: specie.id,
        vaccines: [
          {
            id: 'abc',
            name: 'V30',
            user_id: user.id,
            updated_at: new Date(),
            created_at: new Date(),
          },
        ],
        user_id: user.id,
        isOng: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
