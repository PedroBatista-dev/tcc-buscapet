import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  status: string;
  ong_id: string;
}

class UpdateAdoptionService {
  public async execute({ id, status, ong_id }: IRequest): Promise<Adoption> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const adoption = await adoptionsRepository.findById(id, ong_id);
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    adoption.status = status;

    await adoptionsRepository.save(adoption);

    return adoption;
  }
}

export default UpdateAdoptionService;
