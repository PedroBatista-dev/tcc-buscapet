import { getCustomRepository } from 'typeorm';
import { QuizRepository } from '../typeorm/repositories/QuizRepository';
import Quiz from '../typeorm/entities/Quiz';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

class ShowQuizService {
  public async execute({ user_id }: IRequest): Promise<Quiz> {
    const quizRepository = getCustomRepository(QuizRepository);

    const quiz = await quizRepository.findByUserId(user_id);
    if (!quiz) {
      throw new AppError('Questinário não encontrado!');
    }

    return quiz;
  }
}

export default ShowQuizService;
