import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import CreateVaccineService from '../CreateVaccineService';
import { IVaccine } from '../../domain/models/IVaccine';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let createVaccine: CreateVaccineService;
let vaccine: IVaccine;

describe('CreateVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();
    createVaccine = new CreateVaccineService(
      fakeUsersRepository,
      fakeVaccinesRepository,
    );

    user = await fakeUsersRepository.create({
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

  it('Deve ser capaz de criar uma nova vacina', async () => {
    expect(vaccine).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma vacina com id de usuário inválido', async () => {
    expect(
      createVaccine.execute({
        name: 'v10',
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar uma vacina com o nome ja cadastrado', async () => {
    expect(
      createVaccine.execute({
        name: 'v8',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
