import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  isOng: boolean;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const baseUrl = request.baseUrl;
  const urls_Ong = [
    '/colors',
    '/species',
    '/vaccines',
    '/breeds',
    '/animals',
    '/adoptions-ong',
  ];
  const urls_Adopter = ['/quiz', '/animals-adopter', '/adoptions-adopter'];

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não existe');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub, isOng } = decodedToken as ITokenPayload;

    if (
      (!isOng && urls_Ong.includes(baseUrl)) ||
      (isOng && urls_Adopter.includes(baseUrl))
    ) {
      throw new AppError('');
    }

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT Token inválido');
  }
}
