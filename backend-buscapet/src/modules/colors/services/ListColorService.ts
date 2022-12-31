import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../infra/typeorm/repositories/ColorsRepository';
import Color from '../infra/typeorm/entities/Color';

interface IRequest {
  user_id: string;
}

interface IPaginateColor {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Color[];
}

class ListColorService {
  public async execute({ user_id }: IRequest): Promise<IPaginateColor> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const colors = await colorsRepository
      .createQueryBuilder('color')
      .where('color.user_id = :id', { id: user_id })
      .paginate();

    return colors as IPaginateColor;
  }
}

export default ListColorService;
