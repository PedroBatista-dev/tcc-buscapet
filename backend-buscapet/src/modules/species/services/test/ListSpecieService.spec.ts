import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../CreateSpecieService';
import ListSpecieService from '../ListSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let listSpecie: ListSpecieService;

describe('ListSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );
    listSpecie = new ListSpecieService(fakeSpeciesRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await createSpecie.execute({
      name: 'canina',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de listar as espécies', async () => {
    const species = await listSpecie.execute({ user_id: user.id });

    expect(species.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'canina',
          user_id: user.id,
        }),
      ]),
    );
  });
});
