import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import * as cnpjs from '@fnando/cnpj';
import * as cpfs from '@fnando/cpf';

interface IRequest {
  name: string;
  email: string;
  password: string;
  isOng: boolean;
  cpf: string;
  cnpj: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    isOng,
    cpf,
    cnpj,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já cadastrado!');
    }

    if (isOng) {
      const cnpjValid = cnpjs.isValid(cnpj);
      if (!cnpjValid) {
        throw new AppError('CNPJ inválido!');
      }
      const documentExists = await usersRepository.findByCnpj(cnpj);
      if (documentExists) {
        throw new AppError('CNPJ já cadastrado!');
      }
    } else {
      const cnpjValid = cpfs.isValid(cpf);
      if (!cnpjValid) {
        throw new AppError('CPF inválido!');
      }
      const documentExists = await usersRepository.findByCpf(cpf);
      if (documentExists) {
        throw new AppError('CPF já cadastrado!');
      }
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isOng,
      cpf,
      cnpj,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
