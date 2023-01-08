import AppError from '../../../shared/errors/AppError';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  adopter_id: string;
  isOng: boolean;
}

@injectable()
class DeleteAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({ id, adopter_id, isOng }: IRequest): Promise<void> {
    if (isOng) {
      throw new AppError('JWT Token inválido');
    }

    const adoption = await this.adoptionsRepository.findById(
      id,
      adopter_id,
      isOng,
    );
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    if (adoption.status !== 'Solicitada') {
      throw new AppError(
        'Adoção aprovada ou reprovada não pode ser cancelada!',
      );
    }

    await this.adoptionsRepository.remove(adoption);
  }
}

export default DeleteAdoptionService;
