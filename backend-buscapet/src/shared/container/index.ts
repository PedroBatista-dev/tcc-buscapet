import { container } from 'tsyringe';

import { IVaccinesRepository } from '@modules/vaccines/domain/repositories/IVaccinesRepository';
import { VaccinesRepository } from '@modules/vaccines/infra/typeorm/repositories/VaccinesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { ISpeciesRepository } from '@modules/species/domain/repositories/ISpeciesRepository';
import { SpeciesRepository } from '@modules/species/infra/typeorm/repositories/SpeciesRepository';
import { IQuizRepository } from '@modules/quiz/domain/repositories/IQuizRepository';
import { QuizRepository } from '@modules/quiz/infra/typeorm/repositories/QuizRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IBreedsRepository } from '@modules/breeds/domain/repositories/IBreedsRepository';
import { BreedsRepository } from '@modules/breeds/infra/typeorm/repositories/BreedsRepository';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { AnimalsRepository } from '@modules/animals/infra/typeorm/repositories/AnimalsRepository';
import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';
import { AdoptionsRepository } from '@modules/adoptions/infra/typeorm/repositories/AdoptionsRepository';
import { IAnimalsVaccinesRepository } from '@modules/animals/domain/repositories/IAnimalsvaccinesRepository';
import { AnimalsVaccinesRepository } from '@modules/animals/infra/typeorm/repositories/AnimalsVaccinesRepository';

container.registerSingleton<IVaccinesRepository>(
  'VaccinesRepository',
  VaccinesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ISpeciesRepository>(
  'SpeciesRepository',
  SpeciesRepository,
);

container.registerSingleton<IBreedsRepository>(
  'BreedsRepository',
  BreedsRepository,
);

container.registerSingleton<IAnimalsRepository>(
  'AnimalsRepository',
  AnimalsRepository,
);

container.registerSingleton<IAnimalsVaccinesRepository>(
  'AnimalsVaccinesRepository',
  AnimalsVaccinesRepository,
);

container.registerSingleton<IAdoptionsRepository>(
  'AdoptionsRepository',
  AdoptionsRepository,
);

container.registerSingleton<IQuizRepository>('QuizRepository', QuizRepository);
