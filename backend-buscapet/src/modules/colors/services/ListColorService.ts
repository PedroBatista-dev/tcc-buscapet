import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';

interface IRequest {
  user_id: string;
}

class ListColorService {
  public async execute({ user_id }: IRequest): Promise<Color[]> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const colors = await colorsRepository.find({
      where: {
        user_id,
      },
    });

    return colors;
  }
}

export default ListColorService;
