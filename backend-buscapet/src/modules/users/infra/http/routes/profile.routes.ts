import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/:id', profileController.show);

profileRouter.put(
  '/password',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  profileController.updatePassword,
);

profileRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
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
  profileController.update,
);

export default profileRouter;
