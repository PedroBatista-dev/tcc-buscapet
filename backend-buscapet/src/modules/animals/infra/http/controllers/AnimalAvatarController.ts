import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAnimalAvatarService from '../../../services/UpdateAnimalAvatarService';

export default class AnimalAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const { imagem, imagemUpload } = request.body;

    const updateAvatar = container.resolve(UpdateAnimalAvatarService);

    const animal = await updateAvatar.execute({
      animal_id: id,
      imagem,
      imagemUpload,
      user_id,
    });

    return response.json(animal);
  }
}
