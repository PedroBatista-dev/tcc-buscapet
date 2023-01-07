import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from '../../../users/services/CreateUserService';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeQuizRepository } from '../../domain/repositories/fakes/FakeQuizRepository';
import CreateQuizService from '../CreateQuizService';
import ShowQuizService from '../ShowQuizService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let user: IUser;
let fakeQuizRepository: FakeQuizRepository;
let createQuiz: CreateQuizService;
let showQuiz: ShowQuizService;

describe('ShowQuiz', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);

    fakeQuizRepository = new FakeQuizRepository();
    createQuiz = new CreateQuizService(fakeUsersRepository, fakeQuizRepository);
    showQuiz = new ShowQuizService(fakeQuizRepository);

    user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    await createQuiz.execute({
      birth_date: new Date('1995-03-17'),
      marital_status: 'Casado',
      professional_activity: 'Engenheiro',
      address: 'Av. Zita Soares de Oliveira',
      complement: 'Apto 307',
      district: 'Centro',
      city: 'Ipatinga',
      state: 'MG',
      cep: '35162-378',
      profile_instragam: '@teste',
      for_who: 'para mim',
      why_adopt: 'porque amo cachorro',
      average_life: true,
      financial_conditions: false,
      user_id: user.id,
    });
  });

  it('Deveria ser capaz de mostrar um questionário pelo id do usuário', async () => {
    const idQuiz = await showQuiz.execute({
      user_id: user.id,
    });

    expect(idQuiz).toEqual(
      expect.objectContaining({
        marital_status: 'Casado',
        professional_activity: 'Engenheiro',
        address: 'Av. Zita Soares de Oliveira',
        complement: 'Apto 307',
        district: 'Centro',
        city: 'Ipatinga',
        state: 'MG',
        cep: '35162-378',
        profile_instragam: '@teste',
        for_who: 'para mim',
        why_adopt: 'porque amo cachorro',
        average_life: true,
        financial_conditions: false,
        user_id: user.id,
      }),
    );
  });

  it('Não deveria ser capaz de mostrar um questionário com id de usuário inválido', async () => {
    expect(showQuiz.execute({ user_id: 'abc' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
