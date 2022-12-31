import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { QuizRepository } from '../infra/typeorm/repositories/QuizRepository';
import Quiz from '../infra/typeorm/entities/Quiz';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
  birth_date: Date;
  marital_status: string;
  professional_activity: string;
  address: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  profile_instragam: string;
  for_who: string;
  why_adopt: string;
  average_life: boolean;
  financial_conditions: boolean;
  user_id: string;
}

class CreateQuizService {
  public async execute({
    birth_date,
    marital_status,
    professional_activity,
    address,
    complement,
    district,
    city,
    state,
    cep,
    profile_instragam,
    for_who,
    why_adopt,
    average_life,
    financial_conditions,
    user_id,
  }: IRequest): Promise<Quiz> {
    const usersRepository = getCustomRepository(UsersRepository);
    const quizRepository = getCustomRepository(QuizRepository);

    const userExists = await usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const quizExists = await quizRepository.findByUserId(user_id);
    if (quizExists) {
      throw new AppError(
        'Já existe um questionário cadastrado para esse usuário!',
      );
    }

    const quiz = quizRepository.create({
      birth_date,
      marital_status,
      professional_activity,
      address,
      complement,
      district,
      city,
      state,
      cep,
      profile_instragam,
      for_who,
      why_adopt,
      average_life,
      financial_conditions,
      user_id,
    });

    await quizRepository.save(quiz);

    return quiz;
  }
}

export default CreateQuizService;
