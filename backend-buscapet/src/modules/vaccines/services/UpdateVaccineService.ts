import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
}

class UpdateVaccineService {
  public async execute({ id, name }: IRequest): Promise<Vaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findOne(id);
    if (!vaccine) {
      throw new AppError('Vacina não existe!');
    }

    const vaccineExists = await vaccinesRepository.findByName(name);
    if (vaccineExists && name !== vaccine.name) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    vaccine.name = name;

    await vaccinesRepository.save(vaccine);

    return vaccine;
  }
}

export default UpdateVaccineService;
