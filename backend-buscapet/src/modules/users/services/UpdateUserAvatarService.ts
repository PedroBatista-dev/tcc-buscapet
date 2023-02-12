import AppError from '../../../shared/errors/AppError';
import path from 'path';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import crypto from 'crypto';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';

interface IRequest {
  user_id: string;
  imagem: string;
  imagemUpload: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    imagem,
    imagemUpload,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const fileHash = crypto.randomBytes(10).toString('hex');

    const filename = `${fileHash}-${imagem}`;

    const filePath = path.join(uploadConfig.directory, filename);

    const base64Image = imagemUpload.split(';base64,').pop()!;

    fs.writeFile(filePath, base64Image, { encoding: 'base64' }, function (err) {
      if (err) {
        console.log(err);
      }
    });

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
