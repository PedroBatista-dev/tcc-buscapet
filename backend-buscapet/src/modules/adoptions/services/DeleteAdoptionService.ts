import AppError from '../../../shared/errors/AppError';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimalsRepository } from '../../animals/domain/repositories/IAnimalsRepository';

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
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
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

    const animal = await this.animalsRepository.findById(
      adoption.animal_id,
      adoption.ong_id,
    );
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    await this.adoptionsRepository.remove(adoption);

    animal.status = 'Disponivel';

    await this.animalsRepository.save(animal);
  }
}

export default DeleteAdoptionService;
