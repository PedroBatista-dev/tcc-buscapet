import { Request, Response } from 'express';
import CreateBreedService from '../services/CreateBreedService';
import DeleteBreedService from '../services/DeleteBreedService';
import ListBreedService from '../services/ListBreedService';
import ShowBreedService from '../services/ShowBreedService';
import UpdateBreedService from '../services/UpdateBreedService';

export default class BreedsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBreeds = new ListBreedService();
    const user_id = request.user.id;

    const breeds = await listBreeds.execute({ user_id });

    return response.json(breeds);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const showBreed = new ShowBreedService();

    const breed = await showBreed.execute({ id, user_id });

    return response.json(breed);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, specie_id } = request.body;

    const createBreed = new CreateBreedService();

    const breed = await createBreed.execute({
      name,
      specie_id,
      user_id,
    });

    return response.json(breed);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, specie_id } = request.body;
    const { id } = request.params;

    const updateBreed = new UpdateBreedService();

    const breed = await updateBreed.execute({
      id,
      name,
      specie_id,
      user_id,
    });

    return response.json(breed);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteBreed = new DeleteBreedService();

    await deleteBreed.execute({ id, user_id });

    return response.json([]);
  }
}
