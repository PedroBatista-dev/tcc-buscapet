import { Request, Response } from 'express';
import ListAdoptionService from '../services/ListAdoptionService';
import ShowAdoptionService from '../services/ShowAdoptionService';

export default class AdoptionsApprovedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const status = 'Aprovado';

    const listAdoptions = new ListAdoptionService();

    const adoptions = await listAdoptions.execute({ user_id, status });

    return response.json(adoptions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ong_id = request.user.id;
    const status = 'Aprovado';

    const showAdoption = new ShowAdoptionService();

    const adoption = await showAdoption.execute({ id, ong_id, status });

    return response.json(adoption);
  }
}
