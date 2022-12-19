import { Router } from 'express';
import AdoptionsFailedController from '../controllers/AdoptionsFailedController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsFailedRouter = Router();
const adoptionsFailedController = new AdoptionsFailedController();

adoptionsFailedRouter.use(isAuthenticated);

adoptionsFailedRouter.get('/', adoptionsFailedController.index);

adoptionsFailedRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsFailedController.show,
);

export default adoptionsFailedRouter;
