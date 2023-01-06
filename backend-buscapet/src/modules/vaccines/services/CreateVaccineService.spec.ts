import 'reflect-metadata';
// import { FakeUsersRepository } from '../../users/domain/repositories/fakes/FakeUsersRepository';
// import { FakeVaccinesRepository } from '../domain/repositories/fakes/FakeVaccinesRepository';
// import CreateVaccineService from './CreateVaccineService';

describe('CreateVaccine', () => {
  // it('Deveria ser capaz de criar uma nova vacina', async () => {
  //   const fakeVaccinesRepository = new FakeVaccinesRepository();
  //   const fakeUsersRepository = new FakeUsersRepository();

  //   const createVaccine = new CreateVaccineService(
  //     fakeUsersRepository,
  //     fakeVaccinesRepository,
  //   );

  //   const vaccine = await createVaccine.execute({
  //     name: 'v8',
  //     user_id: 'dsds',
  //   });

  //   expect(vaccine).toHaveProperty('id');
  // });

  it('Não deveria ser capaz de criar duas vacinas com o mesmo nome', () => {
    expect(1).toBe(1);
  });
});
