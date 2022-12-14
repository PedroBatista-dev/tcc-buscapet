import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAnimalService from '../../../services/CreateAnimalService';
import DeleteAnimalService from '../../../services/DeleteAnimalService';
import ListAnimalService from '../../../services/ListAnimalService';
import ShowAnimalService from '../../../services/ShowAnimalService';
import UpdateAnimalService from '../../../services/UpdateAnimalService';

export default class AnimalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;

    const listAnimals = container.resolve(ListAnimalService);

    const animals = await listAnimals.execute({ user_id, isOng });

    return response.json(animals);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const { id } = request.params;

    const showAnimal = container.resolve(ShowAnimalService);

    const animal = await showAnimal.execute({ id, user_id, isOng });

    return response.json(animal);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const {
      name,
      age,
      sex,
      size,
      other_animals,
      color_id,
      breed_id,
      specie_id,
      vaccines,
    } = request.body;

    const createAnimal = container.resolve(CreateAnimalService);

    const animal = await createAnimal.execute({
      name,
      age,
      sex,
      size,
      other_animals,
      color_id,
      breed_id,
      specie_id,
      vaccines,
      user_id,
      isOng,
    });

    return response.json(animal);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const {
      name,
      age,
      sex,
      size,
      other_animals,
      color_id,
      breed_id,
      specie_id,
      vaccines,
    } = request.body;
    const { id } = request.params;

    const updateAnimal = container.resolve(UpdateAnimalService);

    const animal = await updateAnimal.execute({
      id,
      name,
      age,
      sex,
      size,
      other_animals,
      color_id,
      breed_id,
      specie_id,
      vaccines,
      user_id,
      isOng,
    });

    return response.json(animal);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const { id } = request.params;

    const deleteAnimal = container.resolve(DeleteAnimalService);

    await deleteAnimal.execute({ id, user_id, isOng });

    return response.json([]);
  }
}
