import { Router } from 'express';
import animalsRouter from '../../../modules/animals/routes/animals.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import sessionsRouter from '../../../modules/users/routes/sessions.routes';
import passwordRouter from '../../../modules/users/routes/password.routes';
import profileRouter from '../../../modules/users/routes/profile.routes';
import vaccinesRouter from '../../../modules/vaccines/routes/vaccines.routes';
import colorsRouter from '../../../modules/colors/routes/colors.routes';
import speciesRouter from '../../../modules/species/routes/species.routes';
import breedsRouter from '../../../modules/breeds/routes/breeds.routes';
import quizRouter from '../../../modules/quiz/routes/quiz.routes';
import animalsAdopterRouter from '../../../modules/animals/routes/animalsAdopter.routes';
import adoptionsRouter from '../../../modules/adoptions/routes/adoptions.routes';

const routes = Router();

routes.use('/animals', animalsRouter);
routes.use('/animals-adopter', animalsAdopterRouter);
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
