import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../infra/typeorm/repositories/AdoptionsRepository';
import Adoption from '../infra/typeorm/entities/Adoption';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  status: string;
  ong_id: string;
  isOng: boolean;
}

class UpdateAdoptionService {
  public async execute({
    id,
    status,
    ong_id,
    isOng,
  }: IRequest): Promise<Adoption> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const adoption = await adoptionsRepository.findById(id, ong_id, isOng);
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    adoption.status = status;

    await adoptionsRepository.save(adoption);

    return adoption;
  }
}

export default UpdateAdoptionService;
