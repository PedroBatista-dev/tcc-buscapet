import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../CreateSpecieService';
import { ISpecie } from '../../domain/models/ISpecie';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let specie: ISpecie;

describe('CreateSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await createSpecie.execute({
      name: 'canina',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de criar uma nova espécie', async () => {
    expect(specie).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar uma espécie com id de usuário inválido', async () => {
    expect(
      createSpecie.execute({
        name: 'felina',
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar uma espécie com o nome ja cadastrado', async () => {
    expect(
      createSpecie.execute({
        name: 'canina',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
