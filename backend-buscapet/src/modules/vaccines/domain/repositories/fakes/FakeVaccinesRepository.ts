import { IVaccinesRepository } from '../../../domain/repositories/IVaccinesRepository';
import { ICreateVaccine } from '../../../domain/models/ICreateVaccine';
import { v4 as uuidv4 } from 'uuid';
import Vaccine from '../../../infra/typeorm/entities/Vaccine';

interface IFindVaccines {
  vaccine_id: string;
}

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
    const findIndex = this.vaccines.findIndex(
      findVaccine => findVaccine.id === vaccine.id,
    );
    this.vaccines[findIndex] = vaccine;

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

  public async findAll(user_id: string): Promise<Vaccine[]> {
    const vaccines = this.vaccines.filter(
      vaccine => vaccine.user_id === user_id,
    );

    return vaccines;
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
    vaccines: IFindVaccines[],
    user_id: string,
  ): Promise<Vaccine[]> {
    const vaccineIds = vaccines.map(vaccine => vaccine.vaccine_id);

    const idVaccines = this.vaccines.filter(
      vaccine => vaccineIds.includes(vaccine.id) && vaccine.user_id === user_id,
    );
    return idVaccines;
  }
}
