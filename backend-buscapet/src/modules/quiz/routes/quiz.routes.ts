import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const quizRouter = Router();
const quizController = new QuizController();

quizRouter.use(isAuthenticated);

quizRouter.get('/', quizController.show);

quizRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date().required(),
      marital_status: Joi.string().required(),
      professional_activity: Joi.string().required(),
      address: Joi.string().required(),
      complement: Joi.string().required(),
      district: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      cep: Joi.string().required(),
      profile_instragam: Joi.string().required(),
      for_who: Joi.string().required(),
      why_adopt: Joi.string().required(),
      average_life: Joi.string().required(),
      financial_conditions: Joi.string().required(),
    },
  }),
  quizController.create,
);

quizRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date().required(),
      marital_status: Joi.string().required(),
      professional_activity: Joi.string().required(),
      address: Joi.string().required(),
      complement: Joi.string().required(),
      district: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      cep: Joi.string().required(),
      profile_instragam: Joi.string().required(),
      for_who: Joi.string().required(),
      why_adopt: Joi.string().required(),
      average_life: Joi.string().required(),
      financial_conditions: Joi.string().required(),
    },
  }),
  quizController.update,
);

export default quizRouter;
