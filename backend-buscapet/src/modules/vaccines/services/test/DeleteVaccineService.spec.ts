import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../CreateVaccineService';
import { IVaccine } from '../../domain/models/IVaccine';
import DeleteVaccineService from '../DeleteVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let deleteVaccine: DeleteVaccineService;
let vaccine: IVaccine;

describe('DeleteVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );
    deleteVaccine = new DeleteVaccineService(fakeVaccinesRepository);

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

  it('Deveria ser capaz de deletar uma vacina pelo id', async () => {
    await deleteVaccine.execute({ id: vaccine.id, user_id: user.id });
  });

  it('Não deveria ser capaz de deletar uma vacina com id inválido', async () => {
    expect(
      deleteVaccine.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
