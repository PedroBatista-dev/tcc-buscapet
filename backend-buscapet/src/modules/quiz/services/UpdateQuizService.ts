import { getCustomRepository } from 'typeorm';
import { QuizRepository } from '../infra/typeorm/repositories/QuizRepository';
import Quiz from '../infra/typeorm/entities/Quiz';
import AppError from '@shared/errors/AppError';

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

class UpdateQuizService {
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
    const quizRepository = getCustomRepository(QuizRepository);

    const quiz = await quizRepository.findByUserId(user_id);
    if (!quiz) {
      throw new AppError('Questionário não encontrado!');
    }

    quiz.birth_date = birth_date;
    quiz.marital_status = marital_status;
    quiz.professional_activity = professional_activity;
    quiz.address = address;
    quiz.complement = complement;
    quiz.district = district;
    quiz.city = city;
    quiz.state = state;
    quiz.cep = cep;
    quiz.profile_instragam = profile_instragam;
    quiz.for_who = for_who;
    quiz.why_adopt = why_adopt;
    quiz.average_life = average_life;
    quiz.financial_conditions = financial_conditions;

    await quizRepository.save(quiz);

    return quiz;
  }
}

export default UpdateQuizService;
