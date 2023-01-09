import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import { IAnimal } from '../../domain/models/IAnimal';
import UpdateAnimalService from '../UpdateAnimalService';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../../colors/domain/models/IColor';
import { FakeAnimalsVaccinesRepository } from '../../domain/repositories/fakes/FakeAnimalsVaccinesRepository';

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
let fakeAnimalsVaccinesRepository: FakeAnimalsVaccinesRepository;
let updateAnimal: UpdateAnimalService;
let animal: IAnimal;

describe('UpdateAnimal', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeColorsRepository = new FakeColorsRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();

    fakeVaccinesRepository = new FakeVaccinesRepository();

    fakeAnimalsRepository = new FakeAnimalsRepository();
    fakeAnimalsVaccinesRepository = new FakeAnimalsVaccinesRepository();
    updateAnimal = new UpdateAnimalService(
      fakeColorsRepository,
      fakeBreedsRepository,
      fakeSpeciesRepository,
      fakeVaccinesRepository,
      fakeAnimalsRepository,
      fakeAnimalsVaccinesRepository,
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

    vaccine = await fakeVaccinesRepository.create({
      name: 'v8',
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

    animal = await fakeAnimalsRepository.create({
      name: 'Pingo',
      age: 12,
      sex: 'M',
      size: 'M',
      other_animals: 'Não',
      color: color,
      breed: breed,
      specie: specie,
      user_id: user.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });

    await fakeAnimalsRepository.create({
      name: 'Mel',
      age: 9,
      sex: 'F',
      size: 'P',
      other_animals: 'Sim',
      color: color,
      breed: breed,
      specie: specie,
      user_id: user.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });
  });

  it('Deve ser capaz de atualizar um animal pelo id', async () => {
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

  it('Não deve ser capaz de atualizar um animal com id inválido', async () => {
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

  it('Não deve ser capaz de atualizar um animal com o nome ja cadastrado', async () => {
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

  it('Não deve ser capaz de atualizar um animal com id de cor inválido', async () => {
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

  it('Não deve ser capaz de atualizar um animal com id de espécie inválido', async () => {
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

  it('Não deve ser capaz de atualizar um animal com id de raça inválido', async () => {
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

  it('Não deve ser capaz de atualizar um animal com o usuário que não é ONG', async () => {
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

  it('Não deve ser capaz de atualizar um animal com uma raça que não pertence a espécie', async () => {
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

  it('Não deve ser capaz de criar um animal com vacina inválida', async () => {
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
