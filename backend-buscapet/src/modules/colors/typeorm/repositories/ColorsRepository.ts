import Color from '../entities/Color';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Color)
export class ColorsRepository extends Repository<Color> {
  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Color | undefined> {
    const color = await this.findOne({
      where: {
        name,
        user_id,
      },
    });

    return color;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Color | undefined> {
    const color = await this.findOne({
      where: {
        id,
        user_id,
      },
    });

    return color;
  }
}
