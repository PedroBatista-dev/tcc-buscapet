import { Router } from 'express';
import AnimalsAdopterController from '../controllers/AnimalsAdopterController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const animalsAdopterRouter = Router();
const animalsAdopterController = new AnimalsAdopterController();

animalsAdopterRouter.use(isAuthenticated);

animalsAdopterRouter.get('/', animalsAdopterController.index);

export default animalsAdopterRouter;
