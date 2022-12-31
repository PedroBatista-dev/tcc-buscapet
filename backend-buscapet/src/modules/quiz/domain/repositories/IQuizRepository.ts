import { IQuiz } from '../models/IQuiz';

export interface IQuizRepository {
  findByUserId(user_id: string): Promise<IQuiz | undefined>;
}
