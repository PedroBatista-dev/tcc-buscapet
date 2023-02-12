import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { IAdoption } from '../domain/models/IAdoption';

interface IRequest {
  animal_id: string;
  adopter_id: string;
  isOng: boolean;
}

@injectable()
class CreateAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({
    animal_id,
    adopter_id,
    isOng,
  }: IRequest): Promise<IAdoption> {
    if (isOng) {
      throw new AppError('JWT Token inválido');
    }

    const animalExists = await this.animalsRepository.findByIdAll(animal_id);
    if (!animalExists) {
      throw new AppError('Animal não encontrado!');
    }
    if (animalExists.status !== 'Disponivel') {
      throw new AppError('Animal indisponível para adoção!');
    }

    const ongExists = await this.usersRepository.findById(animalExists.user_id);
    if (!ongExists) {
      throw new AppError('Ong não encontrada!');
    }

    const adopterExists = await this.usersRepository.findById(adopter_id);
    if (!adopterExists) {
      throw new AppError('Adotante não encontrado!');
    }

    const adoptionExists =
      await this.adoptionsRepository.findByAnimalOngAdopter(
        animal_id,
        adopter_id,
        ongExists.id,
      );
    if (adoptionExists) {
      throw new AppError('Pedido de adoção já existe!');
    }

    const adoption = await this.adoptionsRepository.create({
      status: 'Solicitada',
      animal: animalExists,
      ong: ongExists,
      adopter: adopterExists,
    });

    animalExists.status = 'Adocao';

    await this.animalsRepository.save(animalExists);

    return adoption;
  }
}

export default CreateAdoptionService;
