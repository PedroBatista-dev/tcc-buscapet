import { Request, Response } from 'express';
import UpdateAnimalAvatarService from '../services/UpdateAnimalAvatarService';

export default class AnimalAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const updateAvatar = new UpdateAnimalAvatarService();

    const animal = updateAvatar.execute({
      animal_id: id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(animal);
  }
}
