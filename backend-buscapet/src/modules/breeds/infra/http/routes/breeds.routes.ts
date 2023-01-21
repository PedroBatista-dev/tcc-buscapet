import { Router } from 'express';
import BreedsController from '../controllers/BreedsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const breedsRouter = Router();
const breedsController = new BreedsController();

breedsRouter.use(isAuthenticated);

breedsRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: { name: Joi.string() } }),
  breedsController.index,
);

breedsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  breedsController.show,
);

breedsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      specie: Joi.object()
        .required()
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().min(2),
          breeds: Joi.array(),
          created_at: Joi.string(),
          updated_at: Joi.string(),
          user_id: Joi.string().uuid(),
        }),
    },
  }),
  breedsController.create,
);

breedsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      specie_id: Joi.string().uuid().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  breedsController.update,
);

breedsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  breedsController.delete,
);

export default breedsRouter;
