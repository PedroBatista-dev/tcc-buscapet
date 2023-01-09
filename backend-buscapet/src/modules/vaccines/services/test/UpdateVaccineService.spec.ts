import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../domain/models/IVaccine';
import UpdateVaccineService from '../UpdateVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let updateVaccine: UpdateVaccineService;
let vaccine: IVaccine;

describe('UpdateVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();
    updateVaccine = new UpdateVaccineService(fakeVaccinesRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    vaccine = await fakeVaccinesRepository.create({
      name: 'v8',
      user_id: user.id,
    });

    await fakeVaccinesRepository.create({
      name: 'raiva',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de atualizar uma vacina pelo id', async () => {
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

  it('Não deve ser capaz de atualizar uma vacina com id inválido', async () => {
    expect(
      updateVaccine.execute({
        id: 'abc',
        name: 'v10',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma vacina com o nome ja cadastrado', async () => {
    expect(
      updateVaccine.execute({
        id: vaccine.id,
        name: 'raiva',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
