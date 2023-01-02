import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IQuizRepository } from '../domain/repositories/IQuizRepository';
import { IQuiz } from '../domain/models/IQuiz';
import { ICreateQuiz } from '../domain/models/ICreateQuiz';

@injectable()
class CreateQuizService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('QuizRepository')
    private quizRepository: IQuizRepository,
  ) {}

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
  }: ICreateQuiz): Promise<IQuiz> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const quizExists = await this.quizRepository.findByUserId(user_id);
    if (quizExists) {
      throw new AppError(
        'Já existe um questionário cadastrado para esse usuário!',
      );
    }

    const quiz = await this.quizRepository.create({
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

    return quiz;
  }
}

export default CreateQuizService;
