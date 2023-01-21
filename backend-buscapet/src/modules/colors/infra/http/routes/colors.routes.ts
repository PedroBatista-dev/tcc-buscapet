import { Router } from 'express';
import ColorsController from '../controllers/ColorsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const colorsRouter = Router();
const colorsController = new ColorsController();

colorsRouter.use(isAuthenticated);

colorsRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: { name: Joi.string() } }),
  colorsController.index,
);

colorsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  colorsController.show,
);

colorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  colorsController.create,
);

colorsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  colorsController.update,
);

colorsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  colorsController.delete,
);

export default colorsRouter;
