import Quiz from '../entities/Quiz';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  public async findByUserId(user_id: string): Promise<Quiz | undefined> {
    const quiz = await this.findOne({
      where: {
        user_id,
      },
    });

    return quiz;
  }
}
