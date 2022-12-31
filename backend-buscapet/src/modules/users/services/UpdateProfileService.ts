import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import * as cnpjs from '@fnando/cnpj';
import * as cpfs from '@fnando/cpf';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  cpf: string;
  cnpj: string;
}
class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    cpf,
    cnpj,
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

    if (user.isOng) {
      const cnpjValid = cnpjs.isValid(cnpj);
      if (!cnpjValid) {
        throw new AppError('CNPJ inválido!');
      }
      const userUpdateDocument = await usersRepository.findByCnpj(cnpj);
      if (userUpdateDocument && userUpdateDocument.id !== user_id) {
        throw new AppError('Já existe um usuário cadastrado com esse cnpj');
      }
      user.cnpj = cnpj;
    } else {
      const cnpjValid = cpfs.isValid(cpf);
      if (!cnpjValid) {
        throw new AppError('CPF inválido!');
      }
      const userUpdateDocument = await usersRepository.findByCpf(cpf);
      if (userUpdateDocument && userUpdateDocument.id !== user_id) {
        throw new AppError('Já existe um usuário cadastrado com esse cpf');
      }
      user.cpf = cpf;
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
