import AppError from '../../../shared/errors/AppError';
import { IQuizRepository } from '../domain/repositories/IQuizRepository';
import { inject, injectable } from 'tsyringe';
import { IQuiz } from '../domain/models/IQuiz';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowQuizService {
  constructor(
    @inject('QuizRepository')
    private quizRepository: IQuizRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IQuiz> {
    const quiz = await this.quizRepository.findByUserId(user_id);
    if (!quiz) {
      throw new AppError('Questinário não encontrado!');
    }

    return quiz;
  }
}

export default ShowQuizService;
