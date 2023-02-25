import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouter.get('/', usersController.index);

usersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required(),
      passwordConfirmation: Joi.string()
        .min(6)
        .max(15)
        .required()
        .valid(Joi.ref('password')),
      isOng: Joi.boolean().required(),
      cpf: Joi.when('isOng', {
        is: false,
        then: Joi.string().required(),
      }),
      cnpj: Joi.when('isOng', {
        is: true,
        then: Joi.string().required(),
      }),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/avatar',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      imagem: Joi.string().required(),
      imagemUpload: Joi.string().required(),
    },
  }),
  usersAvatarController.update,
);

export default usersRouter;
