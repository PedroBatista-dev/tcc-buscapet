import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IVaccinesRepository } from '../domain/repositories/IVaccinesRepository';
import { IVaccine } from '../domain/models/IVaccine';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

@injectable()
class UpdateVaccineService {
  constructor(
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
  ) {}

  public async execute({ id, name, user_id }: IRequest): Promise<IVaccine> {
    const vaccine = await this.vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    const vaccineExists = await this.vaccinesRepository.findByName(
      name,
      user_id,
    );
    if (vaccineExists && name !== vaccine.name) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    vaccine.name = name;

    await this.vaccinesRepository.save(vaccine);

    return vaccine;
  }
}

export default UpdateVaccineService;
