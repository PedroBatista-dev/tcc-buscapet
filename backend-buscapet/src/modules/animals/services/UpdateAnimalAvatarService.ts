import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  animal_id: string;
  avatarFilename: string;
  user_id: string;
}

@injectable()
class UpdateAnimalAvatarService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({
    animal_id,
    avatarFilename,
    user_id,
  }: IRequest): Promise<IAnimal> {
    const animal = await this.animalsRepository.findById(animal_id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    if (animal.avatar) {
      const animalAvatarFilePath = path.join(
        uploadConfig.directory,
        animal.avatar,
      );
      const animalAvatarFileExists = await fs.promises.stat(
        animalAvatarFilePath,
      );

      if (animalAvatarFileExists) {
        await fs.promises.unlink(animalAvatarFilePath);
      }
    }

    animal.avatar = avatarFilename;

    await this.animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalAvatarService;
