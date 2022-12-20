import { Router } from 'express';
import AdoptionsController from '../controllers/AdoptionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsRouter = Router();
const adoptionsController = new AdoptionsController();

adoptionsRouter.use(isAuthenticated);

adoptionsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      status: Joi.string()
        .required()
        .valid('Solicitada', 'Aprovada', 'Reprovada'),
    },
  }),
  adoptionsController.index,
);

adoptionsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.QUERY]: {
      status: Joi.string()
        .required()
        .valid('Solicitada', 'Aprovada', 'Reprovada'),
    },
  }),
  adoptionsController.show,
);

adoptionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      animal_id: Joi.string().uuid().required(),
    },
  }),
  adoptionsController.create,
);

adoptionsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required().valid('Aprovada', 'Reprovada'),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  adoptionsController.update,
);

adoptionsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsController.delete,
);

export default adoptionsRouter;
