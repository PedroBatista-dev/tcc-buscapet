import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdoption } from '../domain/models/IAdoption';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

interface IRequest {
  id: string;
  status: string;
  ong_id: string;
  isOng: boolean;
}

@injectable()
class UpdateAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}
  public async execute({
    id,
    status,
    ong_id,
    isOng,
  }: IRequest): Promise<IAdoption> {
    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const adoption = await this.adoptionsRepository.findById(id, ong_id, isOng);
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    adoption.status = status;

    await this.adoptionsRepository.save(adoption);

    return adoption;
  }
}

export default UpdateAdoptionService;
