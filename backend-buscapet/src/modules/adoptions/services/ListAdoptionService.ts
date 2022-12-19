import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../typeorm/repositories/AdoptionsRepository';
import Adoption from '../typeorm/entities/Adoption';

interface IRequest {
  user_id: string;
  status: string;
}

class ListAdoptionService {
  public async execute({ user_id, status }: IRequest): Promise<Adoption[]> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    const adoptions = await adoptionsRepository.find({
      where: {
        adopter_id: user_id,
        status,
      },
      relations: ['ong', 'adopter', 'animal'],
    });

    return adoptions;
  }
}

export default ListAdoptionService;
