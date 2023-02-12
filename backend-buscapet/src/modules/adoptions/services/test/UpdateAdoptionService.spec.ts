import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAdoptionsRepository } from '../../domain/repositories/fakes/FakeAdoptionsRepository';
import { IAdoption } from '../../domain/models/IAdoption';
import UpdateAdoptionService from '../UpdateAdoptionService';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import { IColor } from '../../../colors/domain/models/IColor';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeAnimalsRepository } from '../../../animals/domain/repositories/fakes/FakeAnimalsRepository';
import { IAnimal } from '../../../animals/domain/models/IAnimal';
import UpdateStatusAnimalService from '../../../animals/services/UpdateStatusAnimalService';

let fakeUsersRepository: FakeUsersRepository;
let userJ: IUser;
let userF: IUser;

let fakeColorsRepository: FakeColorsRepository;
let color: IColor;

let fakeSpeciesRepository: FakeSpeciesRepository;
let specie: ISpecie;

let fakeBreedsRepository: FakeBreedsRepository;
let breed: IBreed;

let fakeVaccinesRepository: FakeVaccinesRepository;
let vaccine: IVaccine;

let fakeAnimalsRepository: FakeAnimalsRepository;
let updateStatusAnimal: UpdateStatusAnimalService;
let animal: IAnimal;
let animal2: IAnimal;

let fakeAdoptionsRepository: FakeAdoptionsRepository;
let updateAdoption: UpdateAdoptionService;
let adoption: IAdoption;
let adoption2: IAdoption;

describe('UpdateAdoption', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeColorsRepository = new FakeColorsRepository();

    fakeSpeciesRepository = new FakeSpeciesRepository();

    fakeBreedsRepository = new FakeBreedsRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();

    fakeAnimalsRepository = new FakeAnimalsRepository();
    updateStatusAnimal = new UpdateStatusAnimalService(fakeAnimalsRepository);

    fakeAdoptionsRepository = new FakeAdoptionsRepository();
    updateAdoption = new UpdateAdoptionService(
      fakeAdoptionsRepository,
      fakeAnimalsRepository,
    );

    userJ = await fakeUsersRepository.create({
      name: 'user J',
      email: 'userj@email.com',
      password: 'userj123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    userF = await fakeUsersRepository.create({
      name: 'userf',
      email: 'userf@email.com',
      password: 'userf123',
      isOng: false,
      cpf: '810.389.660-86',
      cnpj: '',
    });

    color = await fakeColorsRepository.create({
      name: 'preto',
      user_id: userJ.id,
    });

    specie = await fakeSpeciesRepository.create({
      name: 'canina',
      user_id: userJ.id,
    });

    breed = await fakeBreedsRepository.create({
      name: 'lulu',
      specie: specie,
      user_id: userJ.id,
    });

    vaccine = await fakeVaccinesRepository.create({
      name: 'v8',
      user_id: userJ.id,
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
      user_id: userJ.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });

    animal2 = await fakeAnimalsRepository.create({
      name: 'Panqueca',
      age: 1,
      sex: 'F',
      size: 'P',
      other_animals: 'Não',
      color: color,
      breed: breed,
      specie: specie,
      user_id: userJ.id,
      status: 'Criado',
      animals_vaccine: [{ vaccine_id: vaccine.id }],
    });

    await updateStatusAnimal.execute({
      id: animal.id,
      status: 'Disponivel',
      user_id: userJ.id,
    });

    adoption = await fakeAdoptionsRepository.create({
      status: 'Solicitada',
      animal: animal,
      adopter: userF,
      ong: userJ,
    });

    adoption2 = await fakeAdoptionsRepository.create({
      status: 'Solicitada',
      animal: animal2,
      adopter: userF,
      ong: userJ,
    });
  });

  it('Deve ser capaz de aprovar uma adoção pelo id', async () => {
    const adoptionUp = await updateAdoption.execute({
      id: adoption.id,
      status: 'Aprovada',
      ong_id: userJ.id,
      isOng: userJ.isOng,
    });

    expect(adoptionUp).toEqual(
      expect.objectContaining({
        id: adoption.id,
        status: 'Aprovada',
        ong_id: userJ.id,
      }),
    );
  });

  it('Deve ser capaz de reprovar uma adoção pelo id', async () => {
    const adoptionUp = await updateAdoption.execute({
      id: adoption2.id,
      status: 'Reprovada',
      ong_id: userJ.id,
      isOng: userJ.isOng,
    });

    expect(adoptionUp).toEqual(
      expect.objectContaining({
        id: adoption2.id,
        status: 'Reprovada',
        ong_id: userJ.id,
      }),
    );
  });

  it('Não deve ser capaz de atualizar uma adoção com id inválido', async () => {
    expect(
      updateAdoption.execute({
        id: 'abc',
        status: 'Aprovada',
        ong_id: userJ.id,
        isOng: userJ.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma adoção com usuário sem permissão', async () => {
    expect(
      updateAdoption.execute({
        id: adoption.id,
        status: 'Aprovada',
        ong_id: userF.id,
        isOng: userF.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
