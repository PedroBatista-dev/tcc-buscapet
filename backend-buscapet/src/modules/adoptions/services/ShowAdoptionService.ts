import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { IAdoption } from '../domain/models/IAdoption';

interface IRequest {
  id: string;
  user_id: string;
  status: string;
  isOng: boolean;
}

@injectable()
class ShowAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    id,
    user_id,
    status,
    isOng,
  }: IRequest): Promise<IAdoption> {
    const adoption = await this.adoptionsRepository.findByIdUserStatus(
      id,
      user_id,
      status,
      isOng,
    );
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    return adoption;
  }
}

export default ShowAdoptionService;
