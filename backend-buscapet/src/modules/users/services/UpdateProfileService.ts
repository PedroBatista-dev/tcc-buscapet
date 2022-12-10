import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  document: string;
}
class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    document,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('Já existe um usuário cadastrado com esse email');
    }

    const userUpdateDocument = await usersRepository.findByDocument(document);
    if (userUpdateDocument && userUpdateDocument.id !== user_id) {
      throw new AppError('Já existe um usuário cadastrado com esse documento');
    }

    user.name = name;
    user.email = email;
    user.document = document;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
