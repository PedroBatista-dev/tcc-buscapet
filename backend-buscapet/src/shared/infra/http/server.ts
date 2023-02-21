import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/files', express.static(uploadConfig.directory));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
