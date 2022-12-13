import { Router } from 'express';
import ColorsController from '../controllers/QuizController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const colorsRouter = Router();
const colorsController = new ColorsController();

colorsRouter.use(isAuthenticated);

colorsRouter.get('/', colorsController.show);

colorsRouter.post(
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
  colorsController.create,
);

colorsRouter.put(
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
  colorsController.update,
);

export default colorsRouter;
