import { Request, Response } from 'express';
import CreateSpecieService from '../services/CreateSpecieService';
import DeleteSpecieService from '../services/DeleteSpecieService';
import ListSpecieService from '../services/ListSpecieService';
import ShowSpecieService from '../services/ShowSpecieService';
import UpdateSpecieService from '../services/UpdateSpecieService';

export default class SpeciesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSpecies = new ListSpecieService();

    const species = await listSpecies.execute();

    return response.json(species);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSpecie = new ShowSpecieService();

    const specie = await showSpecie.execute({ id });

    return response.json(specie);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSpecie = new CreateSpecieService();

    const specie = await createSpecie.execute({
      name,
    });

    return response.json(specie);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateSpecie = new UpdateSpecieService();

    const specie = await updateSpecie.execute({
      id,
      name,
    });

    return response.json(specie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSpecie = new DeleteSpecieService();

    await deleteSpecie.execute({ id });

    return response.json([]);
  }
}
