import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAnimalAvatarService from '../../../services/UpdateAnimalAvatarService';

export default class AnimalAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const updateAvatar = container.resolve(UpdateAnimalAvatarService);

    const animal = updateAvatar.execute({
      animal_id: id,
      avatarFilename: request.file?.filename as string,
      user_id,
    });

    return response.json(animal);
  }
}
