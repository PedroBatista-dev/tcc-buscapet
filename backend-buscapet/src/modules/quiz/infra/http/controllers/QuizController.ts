import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateQuizService from '../../../services/CreateQuizService';
import ShowQuizService from '../../../services/ShowQuizService';
import UpdateQuizService from '../../../services/UpdateQuizService';

export default class QuizController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listQuiz = container.resolve(ShowQuizService);

    const quiz = await listQuiz.execute({ user_id });

    return response.json(quiz);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    const showQuiz = container.resolve(ShowQuizService);

    const quiz = await showQuiz.execute({ user_id });

    return response.json(quiz);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;
    const user_id = request.user.id;
    const isOng = request.user.isOng;

    const createQuiz = container.resolve(CreateQuizService);

    const quiz = await createQuiz.execute({
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
    });

    return response.json(quiz);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;
    const user_id = request.user.id;
    const isOng = request.user.isOng;

    const updateQuiz = container.resolve(UpdateQuizService);

    const quiz = await updateQuiz.execute({
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
    });

    return response.json(quiz);
  }
}
