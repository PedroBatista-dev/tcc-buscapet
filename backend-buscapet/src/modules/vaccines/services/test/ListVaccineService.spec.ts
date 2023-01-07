import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../CreateVaccineService';
import ListVaccineService from '../ListVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let listVaccine: ListVaccineService;

describe('ListVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );
    listVaccine = new ListVaccineService(fakeVaccinesRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await createVaccine.execute({
      name: 'v8',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de listar as vacinas', async () => {
    const vaccines = await listVaccine.execute({ user_id: user.id });

    expect(vaccines.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'v8',
          user_id: user.id,
        }),
      ]),
    );
  });
});
