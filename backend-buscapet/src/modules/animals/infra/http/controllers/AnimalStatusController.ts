import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateStatusAnimalService from '../../../services/UpdateStatusAnimalService';

export default class AnimalStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { status } = request.body;
    const { id } = request.params;

    const updateStatusAnimal = container.resolve(UpdateStatusAnimalService);

    const animal = await updateStatusAnimal.execute({
      id,
      status,
      user_id,
    });

    return response.json(animal);
  }
}
