import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../CreateAnimalService';
import { IAnimal } from '../../domain/models/IAnimal';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../../colors/domain/models/IColor';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeColorsRepository: FakeColorsRepository;
let color: IColor;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;
let specieF: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let breed: IBreed;
let breedV: IBreed;

let fakeVaccinesRepository: FakeVaccinesRepository;
let vaccine: IVaccine;

let fakeAnimalsRepository: FakeAnimalsRepository;
let createAnimal: CreateAnimalService;
let animal: IAnimal;

describe('CreateAnimal', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeColorsRepository = new FakeColorsRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();

    fakeVaccinesRepository = new FakeVaccinesRepository();

    fakeAnimalsRepository = new FakeAnimalsRepository();
    createAnimal = new CreateAnimalService(
      fakeUsersRepository,
      fakeColorsRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
      fakeVaccinesRepository,
      fakeAnimalsRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    color = await fakeColorsRepository.create({
      name: 'preto',
      user_id: user.id,
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

    specieF = await fakeSpeciesRepository.create({
      name: 'felina',
      user_id: user.id,
    });

    breedV = await fakeBreedsRepository.create({
      name: 'vira-lata',
      specie: specieF,
      user_id: user.id,
    });

    vaccine = await fakeVaccinesRepository.create({
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

  it('Deve ser capaz de criar um novo animal', async () => {
    expect(animal).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um animal com id de usuário inválido', async () => {
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

  it('Não deve ser capaz de criar um animal com id de cor inválido', async () => {
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

  it('Não deve ser capaz de criar um animal com id de espécie inválido', async () => {
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

  it('Não deve ser capaz de criar um animal com id de raça inválido', async () => {
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

  it('Não deve ser capaz de criar um animal com o nome ja cadastrado', async () => {
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

  it('Não deve ser capaz de criar um animal com o usuário que não é ONG', async () => {
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

  it('Não deve ser capaz de criar um animal com uma raça que não pertence a espécie', async () => {
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

  it('Não deve ser capaz de criar um animal com vacina inválida', async () => {
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
