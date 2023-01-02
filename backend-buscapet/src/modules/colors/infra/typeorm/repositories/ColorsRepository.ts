import Color from '../entities/Color';
import { getRepository, Repository } from 'typeorm';
import { IColorsRepository } from '@modules/colors/domain/repositories/IColorsRepository';
import { ICreateColor } from '@modules/colors/domain/models/ICreateColor';
import { IPaginateColor } from '@modules/colors/domain/models/IPaginateColor';

export class ColorsRepository implements IColorsRepository {
  constructor(private ormRepository: Repository<Color>) {
    this.ormRepository = getRepository(Color);
  }

  public async create({ name, user_id }: ICreateColor): Promise<Color> {
    const color = this.ormRepository.create({ name, user_id });

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

  public async findAll(user_id: string): Promise<IPaginateColor> {
    const color = await this.ormRepository
      .createQueryBuilder('color')
      .where('color.user_id = :user_id', { user_id })
      .paginate();

    return color as IPaginateColor;
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
