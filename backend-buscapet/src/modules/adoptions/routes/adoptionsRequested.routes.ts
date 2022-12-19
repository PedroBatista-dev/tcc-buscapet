import { Router } from 'express';
import AdoptionsRequestedController from '../controllers/AdoptionsRequestedController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsRequestedRouter = Router();
const adoptionsRequestedController = new AdoptionsRequestedController();

adoptionsRequestedRouter.use(isAuthenticated);

adoptionsRequestedRouter.get('/', adoptionsRequestedController.index);

adoptionsRequestedRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsRequestedController.show,
);

export default adoptionsRequestedRouter;
