import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../domain/models/IVaccine';
import ShowVaccineService from '../ShowVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let showVaccine: ShowVaccineService;
let vaccine: IVaccine;

describe('ShowVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();
    showVaccine = new ShowVaccineService(fakeVaccinesRepository);

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
  });

  it('Deve ser capaz de mostrar uma vacina pelo id', async () => {
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

  it('Não deve ser capaz de mostrar uma vacina com id inválido', async () => {
    expect(
      showVaccine.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
