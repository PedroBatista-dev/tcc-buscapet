import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';

interface IRequest {
  name: string;
}

class CreateVaccineService {
  public async execute({ name }: IRequest): Promise<Vaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccineExists = await vaccinesRepository.findByName(name);
    if (vaccineExists) {
      throw new AppError('Já existe uma vacina com esse nome!');
    }

    const vaccine = vaccinesRepository.create({
      name,
    });

    await vaccinesRepository.save(vaccine);

    return vaccine;
  }
}

export default CreateVaccineService;
