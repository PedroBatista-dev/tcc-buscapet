import AppError from '../../../shared/errors/AppError';
import { hash } from 'bcryptjs';
import * as cnpjs from '@fnando/cnpj';
import * as cpfs from '@fnando/cpf';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
  isOng: boolean;
  cpf: string;
  cnpj: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    isOng,
    cpf,
    cnpj,
  }: IRequest): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email já cadastrado!');
    }

    if (isOng) {
      const cnpjValid = cnpjs.isValid(cnpj);
      if (!cnpjValid) {
        throw new AppError('CNPJ inválido!');
      }
      const documentExists = await this.usersRepository.findByCnpj(cnpj);
      if (documentExists) {
        throw new AppError('CNPJ já cadastrado!');
      }
    } else {
      const cnpjValid = cpfs.isValid(cpf);
      if (!cnpjValid) {
        throw new AppError('CPF inválido!');
      }
      const documentExists = await this.usersRepository.findByCpf(cpf);
      if (documentExists) {
        throw new AppError('CPF já cadastrado!');
      }
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isOng,
      cpf: isOng ? undefined : cpf,
      cnpj: isOng ? cnpj : undefined,
    });

    return user;
  }
}

export default CreateUserService;
