import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import { IVaccine } from '../../domain/models/IVaccine';
import DeleteVaccineService from '../DeleteVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let deleteVaccine: DeleteVaccineService;
let vaccine: IVaccine;

describe('DeleteVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();
    deleteVaccine = new DeleteVaccineService(fakeVaccinesRepository);

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

  it('Deve ser capaz de deletar uma vacina pelo id', async () => {
    await deleteVaccine.execute({ id: vaccine.id, user_id: user.id });
  });

  it('Não deve ser capaz de deletar uma vacina com id inválido', async () => {
    expect(
      deleteVaccine.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
