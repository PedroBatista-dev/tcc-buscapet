import { Router } from 'express';
import VaccinesController from '../controllers/VaccinesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const vaccinesRouter = Router();
const vaccinesController = new VaccinesController();

vaccinesRouter.use(isAuthenticated);

vaccinesRouter.get('/', vaccinesController.index);

vaccinesRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  vaccinesController.show,
);

vaccinesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  vaccinesController.create,
);

vaccinesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  vaccinesController.update,
);

vaccinesRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  vaccinesController.delete,
);

export default vaccinesRouter;
