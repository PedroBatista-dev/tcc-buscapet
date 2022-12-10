import { getCustomRepository } from 'typeorm';
import { ColorsRepository } from '../typeorm/repositories/ColorsRepository';
import Color from '../typeorm/entities/Color';

class ListColorService {
  public async execute(): Promise<Color[]> {
    const colorsRepository = getCustomRepository(ColorsRepository);

    const colors = await colorsRepository.find();

    return colors;
  }
}

export default ListColorService;
