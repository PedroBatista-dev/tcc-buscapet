import AppError from '../../../shared/errors/AppError';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
  isOng: boolean;
}

@injectable()
class DeleteAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ id, user_id, isOng }: IRequest): Promise<void> {
    if (!isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animal = await this.animalsRepository.findById(id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    if (animal.status !== 'Criado') {
      throw new AppError(
        'Não é permitido deletar um animal em processo de adoção ou adotado!',
      );
    }

    await this.animalsRepository.remove(animal);
  }
}

export default DeleteAnimalService;
