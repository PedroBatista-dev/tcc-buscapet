import { Request, Response } from 'express';
import CreateAdoptionService from '../services/CreateAdoptionService';
import DeleteAdoptionService from '../services/DeleteAdoptionService';
import UpdateAdoptionService from '../services/UpdateAdoptionService';

export default class AdoptionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { animal_id } = request.body;
    const adopter_id = request.user.id;

    const createAdoption = new CreateAdoptionService();

    const adoption = await createAdoption.execute({
      animal_id,
      adopter_id,
    });

    return response.json(adoption);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const { id } = request.params;
    const ong_id = request.user.id;

    const updateAdoption = new UpdateAdoptionService();

    const adoption = await updateAdoption.execute({
      id,
      status,
      ong_id,
    });

    return response.json(adoption);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteAdoption = new DeleteAdoptionService();

    await deleteAdoption.execute({ id, user_id });

    return response.json([]);
  }
}
