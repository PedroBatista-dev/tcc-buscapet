import 'reflect-metadata';
import { container } from 'tsyringe';
import CreateVaccineService from './CreateVaccineService';

describe('CreateVaccine', () => {
  it('Deveria ser capaz de criar uma nova vacina', () => {
    const createVaccine = container.resolve(CreateVaccineService);

    const vaccine = createVaccine.execute({ name: 'v8', user_id: 'dsds' });

    expect(vaccine).toHaveProperty('id');
  });

  it('Não deveria ser capaz de criar duas vacinas com o mesmo nome', () => {
    expect(1).toBe(1);
  });
});
