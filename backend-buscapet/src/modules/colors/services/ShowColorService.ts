import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';
import { IColor } from '../domain/models/IColor';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ShowColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IColor> {
    const color = await this.colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    return color;
  }
}

export default ShowColorService;
