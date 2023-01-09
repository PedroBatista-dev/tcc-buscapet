import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../domain/models/ISpecie';
import UpdateSpecieService from '../UpdateSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let updateSpecie: UpdateSpecieService;
let specie: ISpecie;

describe('UpdateSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpeciesRepository = new FakeSpeciesRepository();
    updateSpecie = new UpdateSpecieService(fakeSpeciesRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    specie = await fakeSpeciesRepository.create({
      name: 'canino',
      user_id: user.id,
    });

    await fakeSpeciesRepository.create({
      name: 'roedor',
      user_id: user.id,
    });
  });

  it('Deve ser capaz de atualizar uma espécie pelo id', async () => {
    const specieUp = await updateSpecie.execute({
      id: specie.id,
      name: 'felino',
      user_id: user.id,
    });

    expect(specieUp).toEqual(
      expect.objectContaining({
        id: specie.id,
        name: 'felino',
        user_id: user.id,
      }),
    );
  });

  it('Não deve ser capaz de atualizar uma espécie com id inválido', async () => {
    expect(
      updateSpecie.execute({
        id: 'abc',
        name: 'canino',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar uma espécie com o nome ja cadastrado', async () => {
    expect(
      updateSpecie.execute({
        id: specie.id,
        name: 'roedor',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
