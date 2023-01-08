import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../CreateAnimalService';
import { IAnimal } from '../../domain/models/IAnimal';
import UpdateAnimalService from '../UpdateAnimalService';
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
import { FakeAnimalsVaccinesRepository } from '../../domain/repositories/fakes/FakeAnimalsVaccinesRepository';

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
let fakeAnimalsVaccinesRepository: FakeAnimalsVaccinesRepository;
let createAnimal: CreateAnimalService;
let updateAnimal: UpdateAnimalService;
let animal: IAnimal;

describe('UpdateAnimal', () => {
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
    fakeAnimalsVaccinesRepository = new FakeAnimalsVaccinesRepository();
    createAnimal = new CreateAnimalService(
      fakeUsersRepository,
      fakeColorsRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
      fakeVaccinesRepository,
      fakeAnimalsRepository,
    );
    updateAnimal = new UpdateAnimalService(
      fakeColorsRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
      fakeVaccinesRepository,
      fakeAnimalsRepository,
      fakeAnimalsVaccinesRepository,
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

    await createAnimal.execute({
      name: 'Mel',
      age: 9,
      sex: 'F',
      size: 'P',
      other_animals: 'Sim',
      color_id: color.id,
      breed_id: breed.id,
      specie_id: specie.id,
      vaccines: [vaccine],
      user_id: user.id,
      isOng: user.isOng,
    });
  });

  it('Deveria ser capaz de atualizar um animal pelo id', async () => {
    const animalUp = await updateAnimal.execute({
      id: animal.id,
      name: 'Rex',
      age: 11,
      sex: 'M',
      size: 'G',
      other_animals: 'Não',
      color_id: color.id,
      breed_id: breed.id,
      specie_id: specie.id,
      vaccines: [vaccine],
      user_id: user.id,
      isOng: user.isOng,
    });

    expect(animalUp).toEqual(
      expect.objectContaining({
        id: animal.id,
        name: 'Rex',
        age: 11,
        sex: 'M',
        size: 'G',
        other_animals: 'Não',
      }),
    );
  });

  it('Não deveria ser capaz de atualizar um animal com id inválido', async () => {
    expect(
      updateAnimal.execute({
        id: 'abc',
        name: 'Rex',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com o nome ja cadastrado', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
        name: 'Mel',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com id de cor inválido', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
        name: 'Bolinha',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com id de espécie inválido', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
        name: 'Bolinha',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com id de raça inválido', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
        name: 'Bolinha',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com o usuário que não é ONG', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
        name: 'Bolinha',
        age: 11,
        sex: 'M',
        size: 'G',
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

  it('Não deveria ser capaz de atualizar um animal com uma raça que não pertence a espécie', async () => {
    expect(
      updateAnimal.execute({
        id: animal.id,
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
      updateAnimal.execute({
        id: animal.id,
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
          },
        ],
        user_id: user.id,
        isOng: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
