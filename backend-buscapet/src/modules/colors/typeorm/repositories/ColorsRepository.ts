import Color from '../entities/Color';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Color)
export class ColorsRepository extends Repository<Color> {
  public async findByName(name: string): Promise<Color | undefined> {
    const color = this.findOne({
      where: {
        name,
      },
    });

    return color;
  }

  public async findById(id: string): Promise<Color | undefined> {
    const color = await this.findOne({
      where: {
        id,
      },
    });

    return color;
  }
}
