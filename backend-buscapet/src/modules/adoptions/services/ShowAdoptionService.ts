import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { IAdoption } from '../domain/models/IAdoption';

interface IRequest {
  id: string;
  user_id: string;
  isOng: boolean;
}

@injectable()
class ShowAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({ id, user_id, isOng }: IRequest): Promise<IAdoption> {
    const adoption = await this.adoptionsRepository.findById(
      id,
      user_id,
      isOng,
    );
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    return adoption;
  }
}

export default ShowAdoptionService;
