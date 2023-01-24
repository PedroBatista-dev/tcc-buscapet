import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IQuizRepository } from '../domain/repositories/IQuizRepository';
import { IQuiz } from '../domain/models/IQuiz';

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
  isOng: boolean;
}

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
    isOng,
  }: IRequest): Promise<IQuiz> {
    if (isOng) {
      throw new AppError('JWT Token inválido');
    }

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
