import { Router } from 'express';
import AnimalsController from '../controllers/AnimalsController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AnimalAvatarController from '../controllers/AnimalAvatarController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import AnimalStatusController from '../controllers/AnimalStatusController';

const animalsRouter = Router();
const animalsController = new AnimalsController();
const animalStatusController = new AnimalStatusController();
const animalsAvatarController = new AnimalAvatarController();

animalsRouter.use(isAuthenticated);

const upload = multer(uploadConfig);

animalsRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: { name: Joi.string() } }),
  animalsController.index,
);

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
      sex: Joi.string().valid('M', 'F').required(),
      size: Joi.string().valid('P', 'M', 'G').required(),
      other_animals: Joi.string().required(),
      color: Joi.object()
        .required()
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().min(2),
          created_at: Joi.string(),
          updated_at: Joi.string(),
          user_id: Joi.string().uuid(),
        }),
      breed: Joi.object()
        .required()
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().min(2),
          specie_id: Joi.string().uuid(),
          created_at: Joi.string(),
          updated_at: Joi.string(),
          user_id: Joi.string().uuid(),
        }),
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
      animals_vaccine: Joi.array().items(
        Joi.object().keys({
          vaccine_id: Joi.string().uuid(),
        }),
      ),
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
      sex: Joi.string().valid('M', 'F').required(),
      size: Joi.string().valid('P', 'M', 'G').required(),
      other_animals: Joi.string().required(),
      color: Joi.object()
        .required()
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().min(2),
          created_at: Joi.string(),
          updated_at: Joi.string(),
          user_id: Joi.string().uuid(),
        }),
      breed: Joi.object()
        .required()
        .keys({
          id: Joi.string().uuid(),
          name: Joi.string().min(2),
          specie_id: Joi.string().uuid(),
          created_at: Joi.string(),
          updated_at: Joi.string(),
          user_id: Joi.string().uuid(),
        }),
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
      animals_vaccine: Joi.array().items(
        Joi.object().keys({
          vaccine_id: Joi.string().uuid(),
        }),
      ),
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
  animalStatusController.update,
);

animalsRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  animalsController.delete,
);

animalsRouter.patch(
  '/:id/avatar',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  upload.single('avatar'),
  animalsAvatarController.update,
);

export default animalsRouter;
