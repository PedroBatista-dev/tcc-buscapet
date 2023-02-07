import { Router } from 'express';
import QuizController from '../controllers/QuizController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const quizRouter = Router();
const quizController = new QuizController();

quizRouter.use(isAuthenticated);

quizRouter.get('/', quizController.index);

quizRouter.get('/:id', quizController.show);

quizRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date()
        .max('01-01-2005')
        .iso()
        .messages({
          'date.format': `Date format is YYYY-MM-DD`,
          'date.max': `Age must be 18+`,
        })
        .required(),
      marital_status: Joi.string()
        .valid('Casado', 'Solteiro', 'Divorciado', 'Viuvo')
        .required(),
      professional_activity: Joi.string().min(2).required(),
      address: Joi.string().min(2).required(),
      complement: Joi.string().optional().allow('').min(2),
      district: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().max(2).required(),
      cep: Joi.string().length(9).required(),
      profile_instragam: Joi.string().optional().allow('').min(2),
      for_who: Joi.string().min(2).required(),
      why_adopt: Joi.string().min(2).required(),
      average_life: Joi.boolean().required(),
      financial_conditions: Joi.boolean().required(),
    },
  }),
  quizController.create,
);

quizRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      birth_date: Joi.date()
        .max('01-01-2005')
        .iso()
        .messages({
          'date.format': `Date format is YYYY-MM-DD`,
          'date.max': `Age must be 18+`,
        })
        .required(),
      marital_status: Joi.string()
        .valid('Casado', 'Solteiro', 'Divorciado', 'Viuvo')
        .required(),
      professional_activity: Joi.string().min(2).required(),
      address: Joi.string().min(2).required(),
      complement: Joi.string().optional().allow('').min(2),
      district: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      state: Joi.string().max(2).required(),
      cep: Joi.string().length(9).required(),
      profile_instragam: Joi.string().optional().allow('').min(2),
      for_who: Joi.string().min(2).required(),
      why_adopt: Joi.string().min(2).required(),
      average_life: Joi.boolean().required(),
      financial_conditions: Joi.boolean().required(),
    },
  }),
  quizController.update,
);

export default quizRouter;
