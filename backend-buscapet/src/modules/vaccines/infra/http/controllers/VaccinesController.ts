import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateVaccineService from '../../../services/CreateVaccineService';
import DeleteVaccineService from '../../../services/DeleteVaccineService';
import ListVaccineService from '../../../services/ListVaccineService';
import ShowVaccineService from '../../../services/ShowVaccineService';
import UpdateVaccineService from '../../../services/UpdateVaccineService';

export default class VaccinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listVaccines = container.resolve(ListVaccineService);

    const vaccines = await listVaccines.execute({ user_id });

    return response.json(vaccines);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const showVaccine = container.resolve(ShowVaccineService);

    const vaccine = await showVaccine.execute({ id, user_id });

    return response.json(vaccine);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createVaccine = container.resolve(CreateVaccineService);

    const vaccine = await createVaccine.execute({
      name,
      user_id,
    });

    return response.json(vaccine);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;
    const { id } = request.params;

    const updateVaccine = container.resolve(UpdateVaccineService);

    const vaccine = await updateVaccine.execute({
      id,
      name,
      user_id,
    });

    return response.json(vaccine);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteVaccine = container.resolve(DeleteVaccineService);

    await deleteVaccine.execute({ id, user_id });

    return response.json([]);
  }
}
