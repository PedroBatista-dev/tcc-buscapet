import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import CreateSpecieService from '../CreateSpecieService';
import { ISpecie } from '../../domain/models/ISpecie';
import DeleteSpecieService from '../DeleteSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let createSpecie: CreateSpecieService;
let deleteSpecie: DeleteSpecieService;
let specie: ISpecie;

describe('DeleteSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
    fakeSpeciesRepository = new FakeSpeciesRepository();
    createSpecie = new CreateSpecieService(
      fakeUsersRepository,
      fakeSpeciesRepository,
    );
    deleteSpecie = new DeleteSpecieService(fakeSpeciesRepository);

    user = await createUser.execute({
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

  it('Deveria ser capaz de deletar uma espécie pelo id', async () => {
    await deleteSpecie.execute({ id: specie.id, user_id: user.id });
  });

  it('Não deveria ser capaz de deletar uma espécie com id inválido', async () => {
    expect(
      deleteSpecie.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
