import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';
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

    if (isOng) {
      const adoption = await adoptionsRepository.findOne({
        where: {
          id,
          ong_id: user_id,
          status,
        },
        relations: ['ong', 'adopter', 'animal'],
      });
      if (!adoption) {
        throw new AppError('Adoção não encontrada!');
      }

      return adoption;
    } else {
      const adoption = await adoptionsRepository.findOne({
        where: {
          id,
          adopter_id: user_id,
          status,
        },
        relations: ['ong', 'adopter', 'animal'],
      });
      if (!adoption) {
        throw new AppError('Adoção não encontrada!');
      }

      return adoption;
    }
  }
}

export default ShowAdoptionService;
