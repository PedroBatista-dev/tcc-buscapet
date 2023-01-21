import { IColorsRepository } from '../../../domain/repositories/IColorsRepository';
import { ICreateColor } from '../../../domain/models/ICreateColor';
import { v4 as uuidv4 } from 'uuid';
import Color from '../../../infra/typeorm/entities/Color';

export class FakeColorsRepository implements IColorsRepository {
  private colors: Color[] = [];

  public async create({ name, user_id }: ICreateColor): Promise<Color> {
    const color = new Color();

    color.id = uuidv4();
    color.name = name;
    color.user_id = user_id;

    this.colors.push(color);

    return color;
  }

  public async save(color: Color): Promise<Color> {
    const findIndex = this.colors.findIndex(
      findColor => findColor.id === color.id,
    );
    this.colors[findIndex] = color;

    return color;
  }

  public async remove(color: Color): Promise<void> {
    this.colors.splice(
      this.colors.findIndex(vac => {
        vac.id === color.id;
      }),
      1,
    );
  }

  public async findAll(user_id: string): Promise<Color[]> {
    const colors = this.colors.filter(color => color.user_id === user_id);

    return colors;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Color | undefined> {
    const color = this.colors.find(
      color => color.name === name && color.user_id === user_id,
    );
    return color;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Color | undefined> {
    const color = this.colors.find(
      color => color.id === id && color.user_id === user_id,
    );
    return color;
  }
}
