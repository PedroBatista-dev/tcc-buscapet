import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

class DeleteAdoptionService {
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const adoption = await adoptionsRepository.findById(id, user_id);
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    await adoptionsRepository.remove(adoption);
  }
}

export default DeleteAdoptionService;
