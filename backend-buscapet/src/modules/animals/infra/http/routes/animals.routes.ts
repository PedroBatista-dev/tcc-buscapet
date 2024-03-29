import { Router } from 'express';
import AnimalsController from '../controllers/AnimalsController';
import { celebrate, Joi, Segments } from 'celebrate';
import AnimalAvatarController from '../controllers/AnimalAvatarController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import AnimalStatusController from '../controllers/AnimalStatusController';

const animalsRouter = Router();
const animalsController = new AnimalsController();
const animalStatusController = new AnimalStatusController();
const animalsAvatarController = new AnimalAvatarController();

animalsRouter.use(isAuthenticated);

animalsRouter.get(
  '/',
  celebrate({ [Segments.QUERY]: { name: Joi.string() } }),
  animalsController.index,
);

animalsRouter.get(
  '/filter',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(''),
      sex: Joi.string().allow(''),
      size: Joi.string().allow(''),
      other: Joi.string().allow(''),
    },
  }),
  animalsController.filter,
);

animalsRouter.get(
  '/dashboard/:text',
  celebrate({
    [Segments.PARAMS]: {
      text: Joi.string()
        .required()
        .valid('colors', 'species', 'breeds', 'adoptions'),
    },
  }),
  animalsController.dashboard,
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
      status: Joi.string()
        .valid('Criado', 'Disponivel', 'Adocao', 'Adotado')
        .required(),
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

animalsRouter.put(
  '/:id/avatar',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  celebrate({
    [Segments.BODY]: {
      imagem: Joi.string().required(),
      imagemUpload: Joi.string().required(),
    },
  }),
  animalsAvatarController.update,
);

export default animalsRouter;
