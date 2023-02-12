import 'reflect-metadata';
import { FakeUsersRepository } from '../../../users/domain/repositories/fakes/FakeUsersRepository';
import { IUser } from '../../../users/domain/models/IUser';
import { FakeQuizRepository } from '../../domain/repositories/fakes/FakeQuizRepository';
import ShowQuizService from '../ShowQuizService';

let fakeUsersRepository: FakeUsersRepository;
let user: IUser;

let fakeQuizRepository: FakeQuizRepository;
let showQuiz: ShowQuizService;

describe('ShowQuiz', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeQuizRepository = new FakeQuizRepository();
    showQuiz = new ShowQuizService(fakeQuizRepository);

    user = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@email.com',
      password: 'user123',
      isOng: false,
      cpf: '150.651.700-53',
      cnpj: '',
    });

    await fakeQuizRepository.create({
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

  it('Deve ser capaz de mostrar um questionário pelo id do usuário', async () => {
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
});
