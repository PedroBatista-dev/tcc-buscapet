import { ICreateQuiz } from '../models/ICreateQuiz';
import { IQuiz } from '../models/IQuiz';

export interface IQuizRepository {
  findByUserId(user_id: string): Promise<IQuiz | undefined>;
  create(data: ICreateQuiz): Promise<IQuiz>;
  save(customer: IQuiz): Promise<IQuiz>;
}
