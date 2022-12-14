import { Request, Response } from 'express';
import CreateAdoptionService from '../services/CreateAdoptionService';
import ListAdoptionService from '../services/ListAdoptionService';
import ShowAdoptionService from '../services/ShowAdoptionService';
import UpdateAdoptionService from '../services/UpdateAdoptionService';

export default class AdoptionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAdoptions = new ListAdoptionService();

    const adoptions = await listAdoptions.execute({ user_id });

    return response.json(adoptions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ong_id = request.user.id;

    const showAdoption = new ShowAdoptionService();

    const adoption = await showAdoption.execute({ id, ong_id });

    return response.json(adoption);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { status, animal_id, ong_id } = request.body;
    const adopter_id = request.user.id;

    const createAdoption = new CreateAdoptionService();

    const adoption = await createAdoption.execute({
      status,
      animal_id,
      ong_id,
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
}
