import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';

interface IRequest {
  user_id: string;
}

class ListAdoptionService {
  public async execute({ user_id }: IRequest): Promise<Adoption[]> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const adoptions = await adoptionsRepository.find({
      where: {
        user_id,
      },
    });

    return adoptions;
  }
}

export default ListAdoptionService;
