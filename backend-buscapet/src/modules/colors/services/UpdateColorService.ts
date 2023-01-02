import AppError from '@shared/errors/AppError';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';
import { inject, injectable } from 'tsyringe';
import { IColor } from '../domain/models/IColor';

interface IRequest {
  id: string;
  name: string;
  user_id: string;
}

@injectable()
class UpdateColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ id, name, user_id }: IRequest): Promise<IColor> {
    const color = await this.colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    const colorExists = await this.colorsRepository.findByName(name, user_id);
    if (colorExists && name !== color.name) {
      throw new AppError('Já existe uma cor com esse nome!');
    }

    color.name = name;

    await this.colorsRepository.save(color);

    return color;
  }
}

export default UpdateColorService;
