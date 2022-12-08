import Animal from '../entities/Animal';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  public async findByName(name: string): Promise<Animal | undefined> {
    const animal = this.findOne({
      where: {
        name,
      },
    });

    return animal;
  }
}
