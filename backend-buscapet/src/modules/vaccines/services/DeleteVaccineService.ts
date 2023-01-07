import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IVaccinesRepository } from '../domain/repositories/IVaccinesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteVaccineService {
  constructor(
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const vaccine = await this.vaccinesRepository.findById(id, user_id);
    if (!vaccine) {
      throw new AppError('Vacina não encontrada!');
    }

    await this.vaccinesRepository.remove(vaccine);
  }
}

export default DeleteVaccineService;
