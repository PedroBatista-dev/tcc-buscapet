import { Router } from 'express';
import animalsRouter from '../../../modules/animals/routes/animals.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.routes';
import passwordRouter from '../../../modules/users/routes/password.routes';
import profileRouter from '../../../modules/users/routes/profile.routes';
import vaccinesRouter from '../../../modules/vaccines/routes/vaccines.routes';
import colorsRouter from '../../../modules/colors/routes/colors.routes';

const routes = Router();

routes.use('/animals', animalsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/vaccines', vaccinesRouter);
routes.use('/colors', colorsRouter);

export default routes;
