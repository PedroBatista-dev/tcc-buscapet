import { inject, injectable } from 'tsyringe';
import { IColor } from '../domain/models/IColor';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class ListColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<IColor[]> {
    const colors = await this.colorsRepository.findAll(user_id, name);

    return colors;
  }
}

export default ListColorService;
