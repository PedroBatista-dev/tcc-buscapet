import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdatePasswordService from '../../../services/UpdatePasswordService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, cnpj } = request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      cpf,
      cnpj,
    });

    return response.json(instanceToInstance(user));
  }

  public async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, old_password } = request.body;
    const user_id = request.user.id;

    const updatePassword = container.resolve(UpdatePasswordService);

    const user = await updatePassword.execute({
      user_id,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
