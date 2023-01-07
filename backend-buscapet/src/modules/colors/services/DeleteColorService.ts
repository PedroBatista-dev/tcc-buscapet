import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}
  public async execute({ id, user_id }: IRequest): Promise<void> {
    const color = await this.colorsRepository.findById(id, user_id);
    if (!color) {
      throw new AppError('Cor não encontrada!');
    }

    await this.colorsRepository.remove(color);
  }
}

export default DeleteColorService;
