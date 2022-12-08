import { Router } from 'express';
import animalsRouter from '@modules/animals/routes/animals.routes';

const routes = Router();

routes.use('/animals', animalsRouter);

export default routes;
