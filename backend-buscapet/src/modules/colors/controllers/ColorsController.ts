import { Request, Response } from 'express';
import CreateColorService from '../services/CreateColorService';
import DeleteColorService from '../services/DeleteColorService';
import ListColorService from '../services/ListColorService';
import ShowColorService from '../services/ShowColorService';
import UpdateColorService from '../services/UpdateColorService';

export default class ColorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listColors = new ListColorService();

    const colors = await listColors.execute();

    return response.json(colors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showColor = new ShowColorService();

    const color = await showColor.execute({ id });

    return response.json(color);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createColor = new CreateColorService();

    const color = await createColor.execute({
      name,
    });

    return response.json(color);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateColor = new UpdateColorService();

    const color = await updateColor.execute({
      id,
      name,
    });

    return response.json(color);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteColor = new DeleteColorService();

    await deleteColor.execute({ id });

    return response.json([]);
  }
}
