import Vaccine from '../entities/Vaccine';
import { EntityRepository, In, Repository } from 'typeorm';

interface IFindVaccines {
  id: string;
}

@EntityRepository(Vaccine)
export class VaccinesRepository extends Repository<Vaccine> {
  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Vaccine | undefined> {
    const vaccine = this.findOne({
      where: {
        name,
        user_id,
      },
    });

    return vaccine;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Vaccine | undefined> {
    const vaccine = await this.findOne({
      where: {
        id,
        user_id,
      },
    });

    return vaccine;
  }

  public async findAllByIds(vaccines: IFindVaccines[]): Promise<Vaccine[]> {
    const vaccineIds = vaccines.map(vaccine => vaccine.id);

    const existsVaccines = await this.find({
      where: {
        id: In(vaccineIds),
      },
    });

    return existsVaccines;
  }
}
