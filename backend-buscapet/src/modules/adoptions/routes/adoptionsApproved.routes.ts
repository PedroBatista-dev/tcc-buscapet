import { Router } from 'express';
import AdoptionsApprovedController from '../controllers/AdoptionsApprovedController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const adoptionsApprovedRouter = Router();
const adoptionsApprovedController = new AdoptionsApprovedController();

adoptionsApprovedRouter.use(isAuthenticated);

adoptionsApprovedRouter.get('/', adoptionsApprovedController.index);

adoptionsApprovedRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  adoptionsApprovedController.show,
);

export default adoptionsApprovedRouter;
