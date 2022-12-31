import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../infra/typeorm/repositories/AdoptionsRepository';
import Adoption from '../infra/typeorm/entities/Adoption';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
  status: string;
  isOng: boolean;
}

class ShowAdoptionService {
  public async execute({
    id,
    user_id,
    status,
    isOng,
  }: IRequest): Promise<Adoption> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const adoption = await adoptionsRepository.findByIdUserStatus(
      id,
      user_id,
      status,
      isOng,
    );
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    return adoption;
  }
}

export default ShowAdoptionService;
