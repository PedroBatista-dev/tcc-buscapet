import { IQuizRepository } from '../../../domain/repositories/IQuizRepository';
import { ICreateQuiz } from '../../../domain/models/ICreateQuiz';
import { v4 as uuidv4 } from 'uuid';
import Quiz from '../../../infra/typeorm/entities/Quiz';

export class FakeQuizRepository implements IQuizRepository {
  private quiz: Quiz[] = [];

  public async create({
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
  }: ICreateQuiz): Promise<Quiz> {
    const quiz = new Quiz();

    quiz.id = uuidv4();
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
    quiz.user_id = user_id;

    this.quiz.push(quiz);

    return quiz;
  }

  public async save(quiz: Quiz): Promise<Quiz> {
    const findIndex = this.quiz.findIndex(findQuiz => findQuiz.id === quiz.id);
    this.quiz[findIndex] = quiz;

    return quiz;
  }

  public async findByUserId(user_id: string): Promise<Quiz | undefined> {
    const quiz = this.quiz.find(quiz => quiz.user_id === user_id);
    return quiz;
  }
}
