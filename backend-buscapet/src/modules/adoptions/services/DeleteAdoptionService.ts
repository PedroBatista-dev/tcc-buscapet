import { getCustomRepository } from 'typeorm';
import { AdoptionsRepository } from '../infra/typeorm/repositories/AdoptionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  adopter_id: string;
  isOng: boolean;
}

class DeleteAdoptionService {
  public async execute({ id, adopter_id, isOng }: IRequest): Promise<void> {
    const adoptionsRepository = getCustomRepository(AdoptionsRepository);

    if (isOng) {
      throw new AppError('JWT Token inválido');
    }

    const adoption = await adoptionsRepository.findById(id, adopter_id, isOng);
    if (!adoption) {
      throw new AppError('Adoção não encontrada!');
    }

    if (adoption.status !== 'Solicitada') {
      throw new AppError(
        'Adoção aprovada ou reprovada não pode ser cancelada!',
      );
    }

    await adoptionsRepository.remove(adoption);
  }
}

export default DeleteAdoptionService;
