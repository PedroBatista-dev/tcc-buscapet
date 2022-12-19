import { Request, Response } from 'express';
import ListAnimalAdopterService from '../services/ListAnimalAdopterService';

export default class AnimalsAdopterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAnimals = new ListAnimalAdopterService();

    const animals = await listAnimals.execute();

    return response.json(animals);
  }
}
