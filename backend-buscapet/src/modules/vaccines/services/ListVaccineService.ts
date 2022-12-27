import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';

interface IRequest {
  user_id: string;
}

interface IPaginateVaccine {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Vaccine[];
}

class ListVaccineService {
  public async execute({ user_id }: IRequest): Promise<IPaginateVaccine> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccines = await vaccinesRepository
      .createQueryBuilder('vaccine')
      .where('vaccine.user_id = :user_id', { user_id })
      .paginate();

    return vaccines as IPaginateVaccine;
  }
}

export default ListVaccineService;
