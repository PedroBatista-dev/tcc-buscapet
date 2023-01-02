import Adoption from '../entities/Adoption';
import { getRepository, Repository } from 'typeorm';
import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';
import { ICreateAdoption } from '@modules/adoptions/domain/models/ICreateAdoption';
import { IPaginateAdoption } from '@modules/adoptions/domain/models/IPaginateVaccine';

export class AdoptionsRepository implements IAdoptionsRepository {
  constructor(private ormRepository: Repository<Adoption>) {
    this.ormRepository = getRepository(Adoption);
  }

  public async create({
    status,
    animal,
    ong,
    adopter,
  }: ICreateAdoption): Promise<Adoption> {
    const adoption = this.ormRepository.create({
      status,
      animal,
      ong,
      adopter,
    });

    await this.ormRepository.save(adoption);

    return adoption;
  }

  public async save(adoption: Adoption): Promise<Adoption> {
    await this.ormRepository.save(adoption);

    return adoption;
  }

  public async remove(adoption: Adoption): Promise<void> {
    await this.ormRepository.remove(adoption);
  }

  public async findAll(
    user_id: string,
    status: string,
    isOng: boolean,
  ): Promise<IPaginateAdoption> {
    if (isOng) {
      const adoption = await this.ormRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.ong', 'ong')
        .innerJoinAndSelect('adoption.adopter', 'adopter')
        .innerJoinAndSelect('adoption.animal', 'animal')
        .where('adoption.ong_id = :user_id', { user_id })
        .andWhere('adoption.status = :status', { status })
        .paginate();

      return adoption as IPaginateAdoption;
    } else {
      const adoption = await this.ormRepository
        .createQueryBuilder('adoption')
        .innerJoinAndSelect('adoption.ong', 'ong')
        .innerJoinAndSelect('adoption.adopter', 'adopter')
        .innerJoinAndSelect('adoption.animal', 'animal')
        .where('adoption.adopter_id = :user_id', { user_id })
        .andWhere('adoption.status = :status', { status })
        .paginate();

      return adoption as IPaginateAdoption;
    }
  }

  public async findById(
    id: string,
    user_id: string,
    isOng: boolean,
  ): Promise<Adoption | undefined> {
    if (isOng) {
      const adoption = await this.ormRepository.findOne({
        where: {
          id,
          ong_id: user_id,
        },
      });

      return adoption;
    } else {
      const adoption = await this.ormRepository.findOne({
        where: {
          id,
          adopter_id: user_id,
        },
      });

      return adoption;
    }
  }

  public async findByAnimalOngAdopter(
    animal_id: string,
    adopter_id: string,
    ong_id: string,
  ): Promise<Adoption | undefined> {
    const adoption = await this.ormRepository.findOne({
      where: {
        animal_id,
        adopter_id,
        ong_id,
      },
    });

    return adoption;
  }

  public async findByIdUserStatus(
    id: string,
    user_id: string,
    status: string,
    isOng: boolean,
  ): Promise<Adoption | undefined> {
    if (isOng) {
      const adoption = await this.ormRepository.findOne({
        where: {
          id,
          ong_id: user_id,
          status,
        },
        relations: ['ong', 'adopter', 'animal'],
      });
      return adoption;
    } else {
      const adoption = await this.ormRepository.findOne({
        where: {
          id,
          adopter_id: user_id,
          status,
        },
        relations: ['ong', 'adopter', 'animal'],
      });
      return adoption;
    }
  }
}
