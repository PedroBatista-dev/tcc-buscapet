import Quiz from '../entities/Quiz';
import { EntityRepository, Repository } from 'typeorm';
import { IQuizRepository } from '@modules/quiz/domain/repositories/IQuizRepository';

@EntityRepository(Quiz)
export class QuizRepository
  extends Repository<Quiz>
  implements IQuizRepository
{
  public async findByUserId(user_id: string): Promise<Quiz | undefined> {
    const quiz = await this.findOne({
      where: {
        user_id,
      },
    });

    return quiz;
  }
}
