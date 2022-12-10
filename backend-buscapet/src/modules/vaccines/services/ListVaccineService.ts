import { getCustomRepository } from 'typeorm';
import { VaccinesRepository } from '../typeorm/repositories/VaccinesRepository';
import Vaccine from '../typeorm/entities/Vaccine';

class ListVaccineService {
  public async execute(): Promise<Vaccine[]> {
    const vaccinesRepository = getCustomRepository(VaccinesRepository);

    const vaccines = await vaccinesRepository.find();

    return vaccines;
  }
}

export default ListVaccineService;
