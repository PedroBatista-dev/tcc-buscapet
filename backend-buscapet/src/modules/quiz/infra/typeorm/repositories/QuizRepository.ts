import Quiz from '../entities/Quiz';
import { getRepository, Repository } from 'typeorm';
import { IQuizRepository } from '@modules/quiz/domain/repositories/IQuizRepository';
import { ICreateQuiz } from '@modules/quiz/domain/models/ICreateQuiz';

export class QuizRepository implements IQuizRepository {
  constructor(private ormRepository: Repository<Quiz>) {
    this.ormRepository = getRepository(Quiz);
  }

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
    const quiz = this.ormRepository.create({
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

    await this.ormRepository.save(quiz);

    return quiz;
  }

  public async save(quiz: Quiz): Promise<Quiz> {
    await this.ormRepository.save(quiz);

    return quiz;
  }

  public async findByUserId(user_id: string): Promise<Quiz | undefined> {
    const quiz = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return quiz;
  }
}
