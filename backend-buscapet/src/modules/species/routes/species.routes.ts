import { Router } from 'express';
import SpeciesController from '../controllers/SpeciesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const speciesRouter = Router();
const speciesController = new SpeciesController();

speciesRouter.use(isAuthenticated);

speciesRouter.get('/', speciesController.index);

speciesRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  speciesController.show,
);

speciesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  speciesController.create,
);

speciesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  speciesController.update,
);

speciesRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  speciesController.delete,
);

export default speciesRouter;
