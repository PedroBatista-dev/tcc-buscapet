import AppError from '../../../shared/errors/AppError';
import { IVaccinesRepository } from '../domain/repositories/IVaccinesRepository';
import { ICreateVaccine } from '../domain/models/ICreateVaccine';
import { IUsersRepository } from '../../users/domain/repositories/IUsersRepository';
import { IVaccine } from '../domain/models/IVaccine';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateVaccineService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
  ) {}

  public async execute({ name, user_id }: ICreateVaccine): Promise<IVaccine> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Usuário não encontrado!');
    }

    const vaccineExists = await this.vaccinesRepository.findByName(
      name,
      user_id,
    );
    if (vaccineExists) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    const vaccine = await this.vaccinesRepository.create({
      name,
      user_id,
    });

    return vaccine;
  }
}

export default CreateVaccineService;
