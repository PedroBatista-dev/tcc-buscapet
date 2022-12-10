import { Router } from 'express';
import AnimalsController from '../controllers/AnimalsController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AnimalAvatarController from '../controllers/AnimalAvatarController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const animalsRouter = Router();
const animalsController = new AnimalsController();
const animalsAvatarController = new AnimalAvatarController();

const upload = multer(uploadConfig);

animalsRouter.get('/', animalsController.index);

animalsRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  animalsController.show,
);

animalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      sex: Joi.string().valid('Macho', 'Fêmea').required(),
      size: Joi.string().valid('Pequeno', 'Médio', 'Grande').required(),
      other_animals: Joi.string().required(),
    },
  }),
  animalsController.create,
);

animalsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      age: Joi.number().required(),
      sex: Joi.string().valid('Macho', 'Fêmea').required(),
      size: Joi.string().valid('Pequeno', 'Médio', 'Grande').required(),
      other_animals: Joi.string().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  animalsController.update,
);

animalsRouter.put(
  '/:id/status',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().valid('Criado', 'Adocao', 'Adotado').required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  animalsController.updateStatus,
);

animalsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  animalsController.delete,
);

animalsRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  animalsAvatarController.update,
);

export default animalsRouter;
