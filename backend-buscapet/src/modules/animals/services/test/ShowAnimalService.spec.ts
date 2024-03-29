import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import { IAnimal } from '../../domain/models/IAnimal';
import ShowAnimalService from '../ShowAnimalService';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../../colors/domain/models/IColor';

let fakeUsersRepository: FakeUsersRepository;
let userJuridico: IUser;
let userFisico: IUser;

let fakeColorsRepository: FakeColorsRepository;
let color: IColor;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let breed: IBreed;

let fakeVaccinesRepository: FakeVaccinesRepository;
let vaccine: IVaccine;

let fakeAnimalsRepository: FakeAnimalsRepository;
let showAnimal: ShowAnimalService;
let animal: IAnimal;
let animal2: IAnimal;

describe('ShowAnimal', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeColorsRepository = new FakeColorsRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();

    fakeVaccinesRepository = new FakeVaccinesRepository();

    fakeAnimalsRepository = new FakeAnimalsRepository();
    showAnimal = new ShowAnimalService(fakeAnimalsRepository);

    userJuridico = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    userFisico = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: false,
      cpf: '697.936.340-90',
      cnpj: '',
    });

    color = await fakeColorsRepository.create({
      name: 'preto',
      user_id: userJuridico.id,
    });

    specie = await fakeSpeciesRepository.create({
      name: 'canina',
      user_id: userJuridico.id,
    });

    breed = await fakeBreedsRepository.create({
      name: 'lulu',
      specie: specie,
      user_id: userJuridico.id,
    });

    vaccine = await fakeVaccinesRepository.create({
      name: 'v8',
      user_id: userJuridico.id,
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
      user_id: userJuridico.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });

    animal2 = await fakeAnimalsRepository.create({
      name: 'Simba',
      age: 2,
      sex: 'M',
      size: 'P',
      other_animals: 'Não',
      color: color,
      breed: breed,
      specie: specie,
      user_id: userFisico.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });
  });

  it('Deve ser capaz de mostrar um animal da ONG pelo id', async () => {
    const idAnimal = await showAnimal.execute({
      id: animal.id,
      user_id: userJuridico.id,
      isOng: userJuridico.isOng,
    });

    expect(idAnimal).toEqual(
      expect.objectContaining({
        id: animal.id,
        name: 'Pingo',
        user_id: userJuridico.id,
      }),
    );
  });

  it('Deve ser capaz de mostrar um animal do Adotante pelo id', async () => {
    const idAnimal2 = await showAnimal.execute({
      id: animal2.id,
      user_id: userFisico.id,
      isOng: userFisico.isOng,
    });

    expect(idAnimal2).toEqual(
      expect.objectContaining({
        id: animal2.id,
        name: 'Simba',
        user_id: userFisico.id,
      }),
    );
  });

  it('Não deve ser capaz de mostrar um animal da ONG com id inválido', async () => {
    expect(
      showAnimal.execute({
        id: 'abc',
        user_id: userJuridico.id,
        isOng: userJuridico.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de mostrar um animal do Adotante com id inválido', async () => {
    expect(
      showAnimal.execute({
        id: 'abc',
        user_id: userFisico.id,
        isOng: userFisico.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
