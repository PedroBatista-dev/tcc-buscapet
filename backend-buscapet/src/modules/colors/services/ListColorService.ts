import { inject, injectable } from 'tsyringe';
import { IPaginateColor } from '../domain/models/IPaginateColor';
import { IColorsRepository } from '../domain/repositories/IColorsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IPaginateColor> {
    const colors = await this.colorsRepository.findAll(user_id);

    return colors;
  }
}

export default ListColorService;
