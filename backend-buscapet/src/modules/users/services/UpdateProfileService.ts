import AppError from '@shared/errors/AppError';
import * as cnpjs from '@fnando/cnpj';
import * as cpfs from '@fnando/cpf';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  cpf: string;
  cnpj: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    cpf,
    cnpj,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('Já existe um usuário cadastrado com esse email');
    }

    if (user.isOng) {
      const cnpjValid = cnpjs.isValid(cnpj);
      if (!cnpjValid) {
        throw new AppError('CNPJ inválido!');
      }
      const userUpdateDocument = await this.usersRepository.findByCnpj(cnpj);
      if (userUpdateDocument && userUpdateDocument.id !== user_id) {
        throw new AppError('Já existe um usuário cadastrado com esse cnpj');
      }
      user.cnpj = cnpj;
    } else {
      const cnpjValid = cpfs.isValid(cpf);
      if (!cnpjValid) {
        throw new AppError('CPF inválido!');
      }
      const userUpdateDocument = await this.usersRepository.findByCpf(cpf);
      if (userUpdateDocument && userUpdateDocument.id !== user_id) {
        throw new AppError('Já existe um usuário cadastrado com esse cpf');
      }
      user.cpf = cpf;
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
