import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';

interface IRequest {
  user_id: string;
}

class ListVaccineService {
  public async execute({ user_id }: IRequest): Promise<Vaccine[]> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccines = await vaccinesRepository.find({
      where: {
        user_id,
      },
    });

    return vaccines;
  }
}

export default ListVaccineService;
