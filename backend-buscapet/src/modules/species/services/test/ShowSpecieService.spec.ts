import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../domain/models/ISpecie';
import ShowSpecieService from '../ShowSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let showSpecie: ShowSpecieService;
let specie: ISpecie;

describe('ShowSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpeciesRepository = new FakeSpeciesRepository();
    showSpecie = new ShowSpecieService(fakeSpeciesRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await fakeSpeciesRepository.create({
      name: 'canina',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de mostrar uma espécie pelo id', async () => {
    const idSpecie = await showSpecie.execute({
      id: specie.id,
      user_id: user.id,
    });

    expect(idSpecie).toEqual(
      expect.objectContaining({
        name: 'canina',
        user_id: user.id,
      }),
    );
  });

  it('Não deve ser capaz de mostrar uma espécie com id inválido', async () => {
    expect(
      showSpecie.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
