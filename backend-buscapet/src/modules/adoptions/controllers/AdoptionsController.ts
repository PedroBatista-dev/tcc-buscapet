import { Request, Response } from 'express';
import CreateAdoptionService from '../services/CreateAdoptionService';
import DeleteAdoptionService from '../services/DeleteAdoptionService';
import ListAdoptionService from '../services/ListAdoptionService';
import ShowAdoptionService from '../services/ShowAdoptionService';
import UpdateAdoptionService from '../services/UpdateAdoptionService';

export default class AdoptionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const status = request.query.status as string;

    const listAdoptions = new ListAdoptionService();

    const adoptions = await listAdoptions.execute({ user_id, status, isOng });

    return response.json(adoptions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const status = 'Solicitada';

    const showAdoption = new ShowAdoptionService();

    const adoption = await showAdoption.execute({ id, user_id, status, isOng });

    return response.json(adoption);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { animal_id } = request.body;
    const adopter_id = request.user.id;
    const isOng = request.user.isOng;

    const createAdoption = new CreateAdoptionService();

    const adoption = await createAdoption.execute({
      animal_id,
      adopter_id,
      isOng,
    });

    return response.json(adoption);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { status } = request.body;
    const { id } = request.params;
    const ong_id = request.user.id;
    const isOng = request.user.isOng;

    const updateAdoption = new UpdateAdoptionService();

    const adoption = await updateAdoption.execute({
      id,
      status,
      ong_id,
      isOng,
    });

    return response.json(adoption);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const adopter_id = request.user.id;
    const isOng = request.user.isOng;
    const { id } = request.params;

    const deleteAdoption = new DeleteAdoptionService();

    await deleteAdoption.execute({ id, adopter_id, isOng });

    return response.json([]);
  }
}
