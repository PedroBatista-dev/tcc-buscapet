import Vaccine from '../entities/Vaccine';
import { getRepository, In, Like, Repository } from 'typeorm';
import { IVaccinesRepository } from '@modules/vaccines/domain/repositories/IVaccinesRepository';
import { ICreateVaccine } from '@modules/vaccines/domain/models/ICreateVaccine';

interface IRequestVaccine {
  vaccine_id: string;
}

export class VaccinesRepository implements IVaccinesRepository {
  private ormRepository: Repository<Vaccine>;

  constructor() {
    this.ormRepository = getRepository(Vaccine);
  }

  public async create({ name, user_id }: ICreateVaccine): Promise<Vaccine> {
    const vaccine = await this.ormRepository.create({ name, user_id });

    await this.ormRepository.save(vaccine);

    return vaccine;
  }

  public async save(vaccine: Vaccine): Promise<Vaccine> {
    await this.ormRepository.save(vaccine);

    return vaccine;
  }

  public async remove(vaccine: Vaccine): Promise<void> {
    await this.ormRepository.remove(vaccine);
  }

  public async findAll(user_id: string, name: string): Promise<Vaccine[]> {
    if (name) {
      const vaccines = await this.ormRepository.find({
        where: {
          name: Like(`%${name}%`),
          user_id,
        },
      });

      return vaccines;
    } else {
      const vaccines = await this.ormRepository.find({
        where: {
          user_id,
        },
      });

      return vaccines;
    }
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Vaccine | undefined> {
    const vaccine = await this.ormRepository.findOne({
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
    const vaccine = await this.ormRepository.findOne({
      where: {
        id,
        user_id,
      },
    });

    return vaccine;
  }

  public async findAllByIds(
    vaccines: IRequestVaccine[],
    user_id: string,
  ): Promise<Vaccine[]> {
    const vaccineIds = vaccines.map(vaccine => vaccine.vaccine_id);

    const existsVaccines = await this.ormRepository.find({
      where: {
        id: In(vaccineIds),
        user_id,
      },
    });

    return existsVaccines;
  }
}
