import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateBreedService from '../../../services/CreateBreedService';
import DeleteBreedService from '../../../services/DeleteBreedService';
import ListBreedService from '../../../services/ListBreedService';
import ShowBreedService from '../../../services/ShowBreedService';
import UpdateBreedService from '../../../services/UpdateBreedService';

export default class BreedsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const name = request.query.name as string;

    const listBreeds = container.resolve(ListBreedService);

    const breeds = await listBreeds.execute({ user_id, name });

    return response.json(breeds);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const showBreed = container.resolve(ShowBreedService);

    const breed = await showBreed.execute({ id, user_id });

    return response.json(breed);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, specie } = request.body;
    const specie_id = specie.id;

    const createBreed = container.resolve(CreateBreedService);

    const breed = await createBreed.execute({
      name,
      specie_id,
      user_id,
    });

    return response.json(breed);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, specie } = request.body;
    const specie_id = specie.id;
    const { id } = request.params;

    const updateBreed = container.resolve(UpdateBreedService);

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

    const deleteBreed = container.resolve(DeleteBreedService);

    await deleteBreed.execute({ id, user_id });

    return response.json([]);
  }
}
