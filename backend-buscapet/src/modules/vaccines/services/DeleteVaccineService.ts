import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../infra/typeorm/repositories/VaccinesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class DeleteVaccineService {
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccine = await vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    await vaccinesRepository.remove(vaccine);
  }
}

export default DeleteVaccineService;
