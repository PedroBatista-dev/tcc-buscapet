import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../infra/typeorm/repositories/AdoptionsRepository';
import Adoption from '../infra/typeorm/entities/Adoption';

interface IRequest {
  user_id: string;
  status: string;
  isOng: boolean;
}

interface IPaginateAdoption {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Adoption[];
}

class ListAdoptionService {
  public async execute({
    user_id,
    status,
    isOng,
  }: IRequest): Promise<IPaginateAdoption> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    if (isOng) {
      const adoptions = await adoptionsRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.ong', 'ong')
        .innerJoinAndSelect('adoption.adopter', 'adopter')
        .innerJoinAndSelect('adoption.animal', 'animal')
        .where('adoption.ong_id = :user_id', { user_id })
        .andWhere('adoption.status = :status', { status })
        .paginate();

      return adoptions as IPaginateAdoption;
    } else {
      const adoptions = await adoptionsRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.ong', 'ong')
        .innerJoinAndSelect('adoption.adopter', 'adopter')
        .innerJoinAndSelect('adoption.animal', 'animal')
        .where('adoption.adopter_id = :user_id', { user_id })
        .andWhere('adoption.status = :status', { status })
        .paginate();

      return adoptions as IPaginateAdoption;
    }
  }
}

export default ListAdoptionService;
