import { getCustomRepository } from 'typeorm';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
  isOng: boolean;
}

class DeleteAnimalService {
  public async execute({ id, user_id, isOng }: IRequest): Promise<void> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animal = await animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    if (animal.status !== 'Criado') {
      throw new AppError(
        'Não é permitido deletar um animal em processo de adoção ou adotado!',
      );
    }

    await animalsRepository.remove(animal);
  }
}

export default DeleteAnimalService;
