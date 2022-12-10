import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import { AnimalsRepository } from '../typeorm/repositories/AnimalsRepository';
import Animal from '../typeorm/entities/Animal';

interface IRequest {
  animal_id: string;
  avatarFilename: string;
}

class UpdateAnimalAvatarService {
  public async execute({
    animal_id,
    avatarFilename,
  }: IRequest): Promise<Animal> {
    const animalsRepository = getCustomRepository(AnimalsRepository);

    const animal = await animalsRepository.findById(animal_id);

    if (!animal) {
      throw new AppError('Animal não encontrado');
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

    await animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalAvatarService;
