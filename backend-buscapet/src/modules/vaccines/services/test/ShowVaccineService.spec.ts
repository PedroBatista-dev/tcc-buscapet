import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../CreateVaccineService';
import { IVaccine } from '../../domain/models/IVaccine';
import ShowVaccineService from '../ShowVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let showVaccine: ShowVaccineService;
let vaccine: IVaccine;

describe('ShowVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );
    showVaccine = new ShowVaccineService(fakeVaccinesRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    vaccine = await createVaccine.execute({
      name: 'v8',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de mostrar uma vacina pelo id', async () => {
    const idVaccine = await showVaccine.execute({
      id: vaccine.id,
      user_id: user.id,
    });

    expect(idVaccine).toEqual(
      expect.objectContaining({
        name: 'v8',
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de mostrar uma vacina com id inválido', async () => {
    expect(
      showVaccine.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
