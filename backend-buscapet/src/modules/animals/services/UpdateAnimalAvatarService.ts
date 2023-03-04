import AppError from '../../../shared/errors/AppError';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import crypto from 'crypto';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';
import { IAnimal } from '../domain/models/IAnimal';
import DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '../../../shared/providers/StorageProvider/S3StorageProvider';

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
    const storageProvider = new DiskStorageProvider();

    if (!animal) {
      throw new AppError('Animal não encontrado!');
    }

    const fileHash = crypto.randomBytes(10).toString('hex');

    const filename = `${fileHash}-${imagem}`;

    const filePath = path.join(uploadConfig.tmpFolder, filename);

    const base64Image = imagemUpload.split(';base64,').pop()!;

    fs.writeFile(filePath, base64Image, { encoding: 'base64' }, function (err) {
      if (err) {
        console.log(err);
      }
    });

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();
      if (animal.avatar) {
        await storageProvider.deleteFile(animal.avatar);
      }

      const avatarFileName = await storageProvider.saveFile(filename);

      animal.avatar = avatarFileName;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (animal.avatar) {
        await storageProvider.deleteFile(animal.avatar);
      }

      const avatarFileName = await storageProvider.saveFile(filename);

      animal.avatar = avatarFileName;
    }

    await this.animalsRepository.save(animal);

    return animal;
  }
}

export default UpdateAnimalAvatarService;
