import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeQuizRepository } from '../../domain/repositories/fakes/FakeQuizRepository';
import CreateQuizService from '../CreateQuizService';
import { IQuiz } from '../../domain/models/IQuiz';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;
let fakeQuizRepository: FakeQuizRepository;
let createQuiz: CreateQuizService;
let quiz: IQuiz;

describe('CreateQuiz', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeQuizRepository = new FakeQuizRepository();
    createQuiz = new CreateQuizService(fakeUsersRepository, fakeQuizRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    quiz = await createQuiz.execute({
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

  it('Deve ser capaz de criar um novo questinário', async () => {
    expect(quiz).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um questionário com id de usuário inválido', async () => {
    expect(
      createQuiz.execute({
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
        user_id: 'abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar um questionário para um usuário com um questionário já cadastrado', async () => {
    expect(
      createQuiz.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
