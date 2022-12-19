import { Router } from 'express';
import AdoptionsController from '../controllers/AdoptionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsOngRouter = Router();
const adoptionsController = new AdoptionsController();

adoptionsOngRouter.use(isAuthenticated);

adoptionsOngRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  adoptionsController.update,
);

export default adoptionsOngRouter;
