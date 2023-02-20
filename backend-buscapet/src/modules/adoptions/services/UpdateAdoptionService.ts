import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdoption } from '../domain/models/IAdoption';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { IAnimalsRepository } from '../../animals/domain/repositories/IAnimalsRepository';

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
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
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

    if (adoption.status !== 'Solicitada') {
      throw new AppError('Adoção aprovada ou reprovada não pode ser alterada!');
    }

    const animal = await this.animalsRepository.findById(
      adoption.animal_id,
      ong_id,
    );
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    adoption.status = status;

    await this.adoptionsRepository.save(adoption);

    if (status === 'Aprovada') {
      animal.status = 'Adotado';
    } else {
      animal.status = 'Disponivel';
    }

    await this.animalsRepository.save(animal);

    return adoption;
  }
}

export default UpdateAdoptionService;
