import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteVaccineService {
  public async execute({ id }: IRequest): Promise<void> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findOne(id);
    if (!vaccine) {
      throw new AppError('Vacina não existe!');
    }

    vaccinesRepository.remove(vaccine);
  }
}

export default DeleteVaccineService;
