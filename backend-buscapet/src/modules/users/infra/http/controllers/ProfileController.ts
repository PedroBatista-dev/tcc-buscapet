import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdatePasswordService from '../../../services/UpdatePasswordService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, cnpj } = request.body;
    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

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

    const updatePassword = new UpdatePasswordService();

    const user = await updatePassword.execute({
      user_id,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
