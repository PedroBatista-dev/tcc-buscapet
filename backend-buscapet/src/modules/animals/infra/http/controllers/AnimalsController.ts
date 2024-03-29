import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateAnimalService from '../../../services/CreateAnimalService';
import DeleteAnimalService from '../../../services/DeleteAnimalService';
import ListAnimalService from '../../../services/ListAnimalService';
import ShowAnimalService from '../../../services/ShowAnimalService';
import UpdateAnimalService from '../../../services/UpdateAnimalService';
import DashboardAnimalService from '@modules/animals/services/DashboardAnimalService';
import FilterAnimalService from '@modules/animals/services/FilterAnimalService';

export default class AnimalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const name = request.query.name as string;

    const listAnimals = container.resolve(ListAnimalService);

    const animals = await listAnimals.execute({ user_id, isOng, name });

    return response.json(instanceToInstance(animals));
  }

  public async filter(request: Request, response: Response): Promise<Response> {
    const name = request.query.name as string;
    const sex = request.query.sex as string;
    const size = request.query.size as string;
    const other = request.query.other as string;

    const filterAnimals = container.resolve(FilterAnimalService);

    const animals = await filterAnimals.execute({
      name,
      sex,
      size,
      other,
    });

    return response.json(instanceToInstance(animals));
  }

  public async dashboard(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const { text } = request.params;

    const dashboardAnimals = container.resolve(DashboardAnimalService);

    const dashboard = await dashboardAnimals.execute({ user_id, isOng, text });

    return response.json(instanceToInstance(dashboard));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const isOng = request.user.isOng;
    const { id } = request.params;

    const showAnimal = container.resolve(ShowAnimalService);

    const animal = await showAnimal.execute({ id, user_id, isOng });

    return response.json(instanceToInstance(animal));
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
      color,
      breed,
      specie,
      animals_vaccine,
    } = request.body;
    const color_id = color.id;
    const breed_id = breed.id;
    const specie_id = specie.id;

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
      animals_vaccine,
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
      color,
      breed,
      specie,
      animals_vaccine,
    } = request.body;
    const color_id = color.id;
    const breed_id = breed.id;
    const specie_id = specie.id;
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
      animals_vaccine,
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
