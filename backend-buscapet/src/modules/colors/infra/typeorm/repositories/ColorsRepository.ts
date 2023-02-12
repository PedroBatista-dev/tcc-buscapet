import Color from '../entities/Color';
import { getRepository, ILike, Repository } from 'typeorm';
import { IColorsRepository } from '@modules/colors/domain/repositories/IColorsRepository';
import { ICreateColor } from '@modules/colors/domain/models/ICreateColor';

export class ColorsRepository implements IColorsRepository {
  private ormRepository: Repository<Color>;

  constructor() {
    this.ormRepository = getRepository(Color);
  }

  public async create({ name, user_id }: ICreateColor): Promise<Color> {
    const color = await this.ormRepository.create({ name, user_id });

    await this.ormRepository.save(color);

    return color;
  }

  public async save(color: Color): Promise<Color> {
    await this.ormRepository.save(color);

    return color;
  }

  public async remove(color: Color): Promise<void> {
    await this.ormRepository.remove(color);
  }

  public async findAll(user_id: string, name: string): Promise<Color[]> {
    if (name) {
      const colors = await this.ormRepository.find({
        where: {
          name: ILike(`%${name}%`),
          user_id,
        },
      });

      return colors;
    } else {
      const colors = await this.ormRepository.find({
        where: {
          user_id,
        },
      });

      return colors;
    }
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Color | undefined> {
    const color = await this.ormRepository.findOne({
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
    const color = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
    });

    return color;
  }
}
