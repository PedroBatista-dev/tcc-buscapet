import { Router } from 'express';
import AdoptionsController from '../controllers/AdoptionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsRouter = Router();
const adoptionsController = new AdoptionsController();

adoptionsRouter.use(isAuthenticated);

adoptionsRouter.get('/', adoptionsController.index);

adoptionsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsController.show,
);

adoptionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
      animal_id: Joi.string().required(),
      ong_id: Joi.string().required(),
    },
  }),
  adoptionsController.create,
);

adoptionsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  adoptionsController.update,
);

export default adoptionsRouter;
