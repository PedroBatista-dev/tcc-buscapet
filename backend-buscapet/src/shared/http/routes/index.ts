import { Router } from 'express';
import animalsRouter from '../../../modules/animals/routes/animals.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/animals', animalsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
