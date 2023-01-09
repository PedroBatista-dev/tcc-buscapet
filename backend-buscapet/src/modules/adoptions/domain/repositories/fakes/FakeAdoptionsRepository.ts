import { IAdoptionsRepository } from '../../../domain/repositories/IAdoptionsRepository';
import { ICreateAdoption } from '../../../domain/models/ICreateAdoption';
import { IPaginateAdoption } from '../../models/IPaginateAdoption';
import { v4 as uuidv4 } from 'uuid';
import Adoption from '../../../infra/typeorm/entities/Adoption';

export class FakeAdoptionsRepository implements IAdoptionsRepository {
  private adoptions: Adoption[] = [];

  public async create({
    status,
    animal,
    ong,
    adopter,
  }: ICreateAdoption): Promise<Adoption> {
    const adoption = new Adoption();

    adoption.id = uuidv4();
    adoption.status = status;
    adoption.animal_id = animal.id;
    adoption.ong_id = ong.id;
    adoption.adopter_id = adopter.id;

    this.adoptions.push(adoption);

    return adoption;
  }

  public async save(adoption: Adoption): Promise<Adoption> {
    const findIndex = this.adoptions.findIndex(
      findAdoption => findAdoption.id === adoption.id,
    );
    this.adoptions[findIndex] = adoption;

    return adoption;
  }

  public async remove(adoption: Adoption): Promise<void> {
    this.adoptions.splice(
      this.adoptions.findIndex(vac => {
        vac.id === adoption.id;
      }),
      1,
    );
  }

  public async findAll(
    user_id: string,
    status: string,
    isOng: boolean,
  ): Promise<IPaginateAdoption> {
    if (isOng) {
      const adoptions = this.adoptions.filter(
        adoption => adoption.ong_id === user_id && adoption.status === status,
      );

      const adoptionsPaginate = {
        from: 1,
        to: 1,
        per_page: 1,
        total: 1,
        current_page: 1,
        prev_page: 1,
        next_page: 1,
        data: adoptions,
      };

      return adoptionsPaginate;
    } else {
      const adoptions = this.adoptions.filter(
        adoption =>
          adoption.adopter_id === user_id && adoption.status === status,
      );

      const adoptionsPaginate = {
        from: 1,
        to: 1,
        per_page: 1,
        total: 1,
        current_page: 1,
        prev_page: 1,
        next_page: 1,
        data: adoptions,
      };

      return adoptionsPaginate;
    }
  }

  public async findById(
    id: string,
    user_id: string,
    isOng: boolean,
  ): Promise<Adoption | undefined> {
    if (isOng) {
      const adoption = this.adoptions.find(
        adoption => adoption.id === id && adoption.ong_id === user_id,
      );
      return adoption;
    } else {
      const adoption = this.adoptions.find(
        adoption => adoption.id === id && adoption.adopter_id === user_id,
      );
      return adoption;
    }
  }

  public async findByAnimalOngAdopter(
    animal_id: string,
    adopter_id: string,
    ong_id: string,
  ): Promise<Adoption | undefined> {
    const adoption = this.adoptions.find(
      adoption =>
        adoption.animal_id === animal_id &&
        adoption.adopter_id === adopter_id &&
        adoption.ong_id === ong_id,
    );
    return adoption;
  }

  public async findByIdUserStatus(
    id: string,
    user_id: string,
    status: string,
    isOng: boolean,
  ): Promise<Adoption | undefined> {
    if (isOng) {
      const adoption = this.adoptions.find(
        adoption =>
          adoption.id === id &&
          adoption.ong_id === user_id &&
          adoption.status === status,
      );
      return adoption;
    } else {
      const adoption = this.adoptions.find(
        adoption =>
          adoption.id === id &&
          adoption.adopter_id === user_id &&
          adoption.status === status,
      );
      return adoption;
    }
  }
}
