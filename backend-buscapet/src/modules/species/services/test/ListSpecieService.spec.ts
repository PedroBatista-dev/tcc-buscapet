import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import ListSpecieService from '../ListSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let listSpecie: ListSpecieService;

describe('ListSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpeciesRepository = new FakeSpeciesRepository();
    listSpecie = new ListSpecieService(fakeSpeciesRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await fakeSpeciesRepository.create({
      name: 'canina',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de listar as espécies', async () => {
    const species = await listSpecie.execute({ user_id: user.id });

    expect(species.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'canina',
          user_id: user.id,
        }),
      ]),
    );
  });
});
