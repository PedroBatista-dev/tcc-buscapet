import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeAnimalsRepository } from '../../domain/repositories/fakes/FakeAnimalsRepository';
import CreateAnimalService from '../CreateAnimalService';
import { IAnimal } from '../../domain/models/IAnimal';
import DeleteAnimalService from '../DeleteAnimalService';
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
import UpdateStatusAnimalService from '../UpdateStatusAnimalService';

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
let updateStatusAnimal: UpdateStatusAnimalService;
let deleteAnimal: DeleteAnimalService;
let animal: IAnimal;

describe('DeleteAnimal', () => {
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
    deleteAnimal = new DeleteAnimalService(fakeAnimalsRepository);

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

  it('Deveria ser capaz de deletar um animal pelo id', async () => {
    await deleteAnimal.execute({
      id: animal.id,
      user_id: user.id,
      isOng: user.isOng,
    });
  });

  it('Não deveria ser capaz de deletar um animal com id inválido', async () => {
    expect(
      deleteAnimal.execute({ id: 'abc', user_id: user.id, isOng: user.isOng }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de deletar um animal com o usuário que não é ONG', async () => {
    expect(
      deleteAnimal.execute({ id: animal.id, user_id: user.id, isOng: false }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de deletar um animal com status diferente de criado', async () => {
    await updateStatusAnimal.execute({
      id: animal.id,
      status: 'Adotado',
      user_id: user.id,
    });

    expect(
      deleteAnimal.execute({
        id: animal.id,
        user_id: user.id,
        isOng: user.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
