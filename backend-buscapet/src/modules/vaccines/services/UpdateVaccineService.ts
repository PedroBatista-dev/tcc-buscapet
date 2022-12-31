import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../infra/typeorm/repositories/VaccinesRepository';
import Vaccine from '../infra/typeorm/entities/Vaccine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

class UpdateVaccineService {
  public async execute({ id, name, user_id }: IRequest): Promise<Vaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    const vaccineExists = await vaccinesRepository.findByName(name, user_id);
    if (vaccineExists && name !== vaccine.name) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    vaccine.name = name;

    await vaccinesRepository.save(vaccine);

    return vaccine;
  }
}

export default UpdateVaccineService;
