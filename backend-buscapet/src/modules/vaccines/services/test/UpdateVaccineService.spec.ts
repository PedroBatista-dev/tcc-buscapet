import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../CreateVaccineService';
import { IVaccine } from '../../domain/models/IVaccine';
import UpdateVaccineService from '../UpdateVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let updateVaccine: UpdateVaccineService;
let vaccine: IVaccine;

describe('UpdateVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );
    updateVaccine = new UpdateVaccineService(fakeVaccinesRepository);

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

    await createVaccine.execute({
      name: 'raiva',
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de atualizar uma vacina pelo id', async () => {
    const vaccineUp = await updateVaccine.execute({
      id: vaccine.id,
      name: 'v10',
      user_id: user.id,
    });

    expect(vaccineUp).toEqual(
      expect.objectContaining({
        id: vaccine.id,
        name: 'v10',
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de atualizar uma vacina com id inválido', async () => {
    expect(
      updateVaccine.execute({
        id: 'abc',
        name: 'v10',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deveria ser capaz de atualizar uma vacina com o nome ja cadastrado', async () => {
    expect(
      updateVaccine.execute({
        id: vaccine.id,
        name: 'raiva',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
