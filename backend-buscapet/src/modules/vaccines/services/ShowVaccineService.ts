import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IVaccine } from '../domain/models/IVaccine';
import { IVaccinesRepository } from '../domain/repositories/IVaccinesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ShowVaccineService {
  constructor(
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IVaccine> {
    const vaccine = await this.vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    return vaccine;
  }
}

export default ShowVaccineService;
