import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeSpeciesRepository } from '../../domain/repositories/fakes/FakeSpeciesRepository';
import { ISpecie } from '../../domain/models/ISpecie';
import DeleteSpecieService from '../DeleteSpecieService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeSpeciesRepository: FakeSpeciesRepository;
let deleteSpecie: DeleteSpecieService;
let specie: ISpecie;

describe('DeleteSpecie', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSpeciesRepository = new FakeSpeciesRepository();
    deleteSpecie = new DeleteSpecieService(fakeSpeciesRepository);

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

  it('Deve ser capaz de deletar uma espécie pelo id', async () => {
    await deleteSpecie.execute({ id: specie.id, user_id: user.id });
  });

  it('Não deve ser capaz de deletar uma espécie com id inválido', async () => {
    expect(
      deleteSpecie.execute({ id: 'abc', user_id: user.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
