import Animal from '../entities/Animal';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Animal)
export class AnimalsRepository extends Repository<Animal> {
  public async findByName(name: string): Promise<Animal | undefined> {
    const animal = this.findOne({
      where: {
        name,
      },
    });

    return animal;
  }

  public async findById(id: string): Promise<Animal | undefined> {
    const animal = await this.findOne({
      where: {
        id,
      },
    });

    return animal;
  }
}
