import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowVaccineService {
  public async execute({ id }: IRequest): Promise<Vaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findOne(id);
    if (!vaccine) {
      throw new AppError('Vacina não existe!');
    }

    return vaccine;
  }
}

export default ShowVaccineService;
