import { Request, Response } from 'express';
import CreateColorService from '../services/CreateColorService';
import DeleteColorService from '../services/DeleteColorService';
import ListColorService from '../services/ListColorService';
import ShowColorService from '../services/ShowColorService';
import UpdateColorService from '../services/UpdateColorService';

export default class ColorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listColors = new ListColorService();

    const colors = await listColors.execute({ user_id });

    return response.json(colors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const showColor = new ShowColorService();

    const color = await showColor.execute({ id, user_id });

    return response.json(color);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const user_id = request.user.id;

    const createColor = new CreateColorService();

    const color = await createColor.execute({
      name,
      user_id,
    });

    return response.json(color);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const updateColor = new UpdateColorService();

    const color = await updateColor.execute({
      id,
      name,
      user_id,
    });

    return response.json(color);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const deleteColor = new DeleteColorService();

    await deleteColor.execute({ id, user_id });

    return response.json([]);
  }
}
