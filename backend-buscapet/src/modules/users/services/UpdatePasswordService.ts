import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  password: string;
  old_password: string;
}
class UpdatePasswordService {
  public async execute({
    user_id,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const checkOldPassword = await compare(old_password, user.password);
    if (!checkOldPassword) {
      throw new AppError('Senha antiga não é igual a senha salva no usuário');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);

    return user;
  }
}

export default UpdatePasswordService;
