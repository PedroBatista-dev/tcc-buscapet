import 'reflect-metadata';
import AppError from '../../../../shared/errors/AppError';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeQuizRepository } from '../../domain/repositories/fakes/FakeQuizRepository';
import { IQuiz } from '../../domain/models/IQuiz';
import UpdateQuizService from '../UpdateQuizService';

let fakeUsersRepository: FakeUsersRepository;
let userFisico: IUser;
let userJuridico: IUser;

let fakeQuizRepository: FakeQuizRepository;
let updateQuiz: UpdateQuizService;
let quiz: IQuiz;

describe('UpdateQuiz', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeQuizRepository = new FakeQuizRepository();
    updateQuiz = new UpdateQuizService(fakeQuizRepository);

    userFisico = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: false,
      cpf: '150.651.700-53',
      cnpj: '',
    });

    userJuridico = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: true,
      cpf: '',
      cnpj: '65.658.849/0001-00',
    });

    quiz = await fakeQuizRepository.create({
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
      for_who: 'Para mim',
      why_adopt: 'Porque amo cachorro',
      average_life: true,
      financial_conditions: false,
      user_id: userFisico.id,
    });
  });

  it('Deve ser capaz de atualizar um questionário pelo id do usuário', async () => {
    const quizUp = await updateQuiz.execute({
      birth_date: new Date('1995-03-20'),
      marital_status: 'Solteiro',
      professional_activity: 'Enfermeiro',
      address: 'Av. carlos Chagas',
      complement: 'Apto 102',
      district: 'Cidade Nobre',
      city: 'Ipatinga',
      state: 'MG',
      cep: '35162-374',
      profile_instragam: '@teste2',
      for_who: 'Para meu pai',
      why_adopt: 'Porque ele gosta de cachorro',
      average_life: true,
      financial_conditions: true,
      user_id: userFisico.id,
      isOng: userFisico.isOng,
    });

    expect(quizUp).toEqual(
      expect.objectContaining({
        id: quiz.id,
        marital_status: 'Solteiro',
        professional_activity: 'Enfermeiro',
        address: 'Av. carlos Chagas',
        complement: 'Apto 102',
        district: 'Cidade Nobre',
        city: 'Ipatinga',
        state: 'MG',
        cep: '35162-374',
        profile_instragam: '@teste2',
        for_who: 'Para meu pai',
        why_adopt: 'Porque ele gosta de cachorro',
        average_life: true,
        financial_conditions: true,
        user_id: userFisico.id,
      }),
    );
  });

  it('Não deve ser capaz de atualizar um questionário de usuário ONG', async () => {
    expect(
      updateQuiz.execute({
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
        user_id: userJuridico.id,
        isOng: userJuridico.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar um questionário com id de usuário inválido', async () => {
    expect(
      updateQuiz.execute({
        birth_date: new Date('1995-03-20'),
        marital_status: 'Solteiro',
        professional_activity: 'Enfermeiro',
        address: 'Av. carlos Chagas',
        complement: 'Apto 102',
        district: 'Cidade Nobre',
        city: 'Ipatinga',
        state: 'MG',
        cep: '35162-374',
        profile_instragam: '@teste2',
        for_who: 'para meu pai',
        why_adopt: 'porque ele gosta de cachorro',
        average_life: true,
        financial_conditions: true,
        user_id: 'abc',
        isOng: userFisico.isOng,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
