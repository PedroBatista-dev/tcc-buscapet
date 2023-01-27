import AppError from '../../../shared/errors/AppError';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import crypto from 'crypto';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';

interface IRequest {
  animal_id: string;
  imagem: string;
  imagemUpload: string;
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
    imagem,
    imagemUpload,
    user_id,
  }: IRequest): Promise<IAnimal> {
    const animal = await this.animalsRepository.findById(animal_id, user_id);
    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    const fileHash = crypto.randomBytes(10).toString('hex');

    const filename = `${fileHash}-${imagem}`;

    const filePath = path.join(uploadConfig.directory, filename);

    const base64Image = imagemUpload.split(';base64,').pop()!;

    fs.writeFile(filePath, base64Image, { encoding: 'base64' }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Arquivo criado');
      }
    });

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

    animal.avatar = filename;

    await this.animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalAvatarService;
