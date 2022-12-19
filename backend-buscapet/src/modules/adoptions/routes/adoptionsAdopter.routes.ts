import { Router } from 'express';
import AdoptionsController from '../controllers/AdoptionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsAdopterRouter = Router();
const adoptionsController = new AdoptionsController();

adoptionsAdopterRouter.use(isAuthenticated);

adoptionsAdopterRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      animal_id: Joi.string().uuid().required(),
    },
  }),
  adoptionsController.create,
);

adoptionsAdopterRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsController.delete,
);

export default adoptionsAdopterRouter;
