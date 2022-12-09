import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
  profile: string;
  document: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    profile,
    document,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já cadastrado!');
    }

    const documentExists = await usersRepository.findByDocument(document);
    if (documentExists) {
      throw new AppError('Documento já cadastrado!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      profile,
      document,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
