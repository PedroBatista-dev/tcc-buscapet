import { IVaccinesRepository } from '../../../domain/repositories/IVaccinesRepository';
import { ICreateVaccine } from '../../../domain/models/ICreateVaccine';
import { IPaginateVaccine } from '../../../domain/models/IPaginateVaccine';
import { v4 as uuidv4 } from 'uuid';
import Vaccine from '../../../infra/typeorm/entities/Vaccine';

export class FakeVaccinesRepository implements IVaccinesRepository {
  private vaccines: Vaccine[] = [];

  public async create({ name, user_id }: ICreateVaccine): Promise<Vaccine> {
    const vaccine = new Vaccine();

    vaccine.id = uuidv4();
    vaccine.name = name;
    vaccine.user_id = user_id;

    this.vaccines.push(vaccine);

    return vaccine;
  }

  public async save(vaccine: Vaccine): Promise<Vaccine> {
    Object.assign(this.vaccines, vaccine);

    return vaccine;
  }

  public async remove(vaccine: Vaccine): Promise<void> {
    this.vaccines.splice(
      this.vaccines.findIndex(vac => {
        vac.id === vaccine.id;
      }),
      1,
    );
  }

  public async findAll(user_id: string): Promise<IPaginateVaccine> {
    const vaccines = this.vaccines.filter(
      vaccine => vaccine.user_id === user_id,
    );

    const vaccinesPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: 1,
      next_page: 1,
      data: vaccines,
    };

    return vaccinesPaginate;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<Vaccine | undefined> {
    const vaccine = this.vaccines.find(
      vaccine => vaccine.name === name && vaccine.user_id === user_id,
    );
    return vaccine;
  }

  public async findById(
    id: string,
    user_id: string,
  ): Promise<Vaccine | undefined> {
    const vaccine = this.vaccines.find(
      vaccine => vaccine.id === id && vaccine.user_id === user_id,
    );
    return vaccine;
  }

  public async findAllByIds(
    vaccines: Vaccine[],
    user_id: string,
  ): Promise<Vaccine[]> {
    const idVaccines = this.vaccines.filter(
      vaccine => vaccines.includes(vaccine) && vaccine.user_id === user_id,
    );
    return idVaccines;
  }
}
