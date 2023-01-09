import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeVaccinesRepository } from '../../domain/repositories/fakes/FakeVaccinesRepository';
import ListVaccineService from '../ListVaccineService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeVaccinesRepository: FakeVaccinesRepository;
let listVaccine: ListVaccineService;

describe('ListVaccine', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVaccinesRepository = new FakeVaccinesRepository();
    listVaccine = new ListVaccineService(fakeVaccinesRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await fakeVaccinesRepository.create({
      name: 'v8',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de listar as vacinas', async () => {
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
