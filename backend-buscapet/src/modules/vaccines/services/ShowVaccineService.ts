import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../infra/typeorm/repositories/VaccinesRepository';
import Vaccine from '../infra/typeorm/entities/Vaccine';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class ShowVaccineService {
  public async execute({ id, user_id }: IRequest): Promise<Vaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    return vaccine;
  }
}

export default ShowVaccineService;
