import { Router } from 'express';
import animalsRouter from '@modules/animals/infra/http/routes/animals.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import vaccinesRouter from '@modules/vaccines/infra/http/routes/vaccines.routes';
import colorsRouter from '@modules/colors/infra/http/routes/colors.routes';
import speciesRouter from '@modules/species/infra/http/routes/species.routes';
import breedsRouter from '@modules/breeds/infra/http/routes/breeds.routes';
import quizRouter from '@modules/quiz/infra/http/routes/quiz.routes';
import adoptionsRouter from '@modules/adoptions/infra/http/routes/adoptions.routes';

const routes = Router();

routes.use('/animals', animalsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/vaccines', vaccinesRouter);
routes.use('/colors', colorsRouter);
routes.use('/species', speciesRouter);
routes.use('/breeds', breedsRouter);
routes.use('/quiz', quizRouter);
routes.use('/adoptions', adoptionsRouter);

export default routes;
