import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAdoptionsRepository } from '../../domain/repositories/fakes/FakeAdoptionsRepository';
import CreateAdoptionService from '../CreateAdoptionService';
import { IAdoption } from '../../domain/models/IAdoption';
import DeleteAdoptionService from '../DeleteAdoptionService';
import { FakeColorsRepository } from '../../../colors/domain/repositories/fakes/FakeColorsRepository';
import CreateColorService from '../../../colors/services/CreateColorService';
import { IColor } from '../../../colors/domain/models/IColor';
import { FakeSpeciesRepository } from '../../../species/domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../../../species/services/CreateSpecieService';
import { ISpecie } from '../../../species/domain/models/ISpecie';
import { FakeBreedsRepository } from '../../../breeds/domain/repositories/fakes/FakeBreedsRepository';
import CreateBreedService from '../../../breeds/services/CreateBreedService';
import { IBreed } from '../../../breeds/domain/models/IBreed';
import { FakeVaccinesRepository } from '../../../vaccines/domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../../../vaccines/services/CreateVaccineService';
import { IVaccine } from '../../../vaccines/domain/models/IVaccine';
import { FakeAnimalsRepository } from '../../../animals/domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../../../animals/services/CreateAnimalService';
import { IAnimal } from '../../../animals/domain/models/IAnimal';
import UpdateStatusAnimalService from '../../../animals/services/UpdateStatusAnimalService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let userJ: IUser;
let userF: IUser;

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
let updateStatusAnimal: UpdateStatusAnimalService;
let animal: IAnimal;

let fakeAdoptionsRepository: FakeAdoptionsRepository;
let createAdoption: CreateAdoptionService;
let deleteAdoption: DeleteAdoptionService;
let adoption: IAdoption;

describe('DeleteAdoption', () => {
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
    updateStatusAnimal = new UpdateStatusAnimalService(fakeAnimalsRepository);

    fakeAdoptionsRepository = new FakeAdoptionsRepository();
    createAdoption = new CreateAdoptionService(
      fakeAdoptionsRepository,
      fakeUsersRepository,
      fakeAnimalsRepository,
    );
    deleteAdoption = new DeleteAdoptionService(fakeAdoptionsRepository);

    userJ = await createUser.execute({
      name: 'user J',
      email: 'userj@email.com',
      password: 'userj123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    userF = await createUser.execute({
      name: 'userf',
      email: 'userf@email.com',
      password: 'userf123',
      isOng: false,
      cpf: '810.389.660-86',
      cnpj: '',
    });

    color = await createColor.execute({
      name: 'preto',
      user_id: userJ.id,
    });

    specie = await createSpecie.execute({
      name: 'canina',
      user_id: userJ.id,
    });

    breed = await createBreed.execute({
      name: 'lulu',
      specie_id: specie.id,
      user_id: userJ.id,
    });

    vaccine = await createVaccine.execute({
      name: 'v8',
      user_id: userJ.id,
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
      user_id: userJ.id,
      isOng: userJ.isOng,
    });

    await updateStatusAnimal.execute({
      id: animal.id,
      status: 'Adocao',
      user_id: userJ.id,
    });

    adoption = await createAdoption.execute({
      animal_id: animal.id,
      adopter_id: userF.id,
      isOng: userF.isOng,
    });
  });

  it('Deveria ser capaz de deletar uma adoção pelo id', async () => {
    await deleteAdoption.execute({
      id: adoption.id,
      adopter_id: userF.id,
      isOng: userF.isOng,
    });
  });

  it('Não deveria ser capaz de deletar uma adoção com id inválido', async () => {
    expect(
      deleteAdoption.execute({
        id: 'abc',
        adopter_id: userF.id,
        isOng: userF.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
