import { inject, injectable } from 'tsyringe';
import { IPaginateAdoption } from '../domain/models/IPaginateVaccine';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

interface IRequest {
  user_id: string;
  status: string;
  isOng: boolean;
}

@injectable()
class ListAdoptionService {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    user_id,
    status,
    isOng,
  }: IRequest): Promise<IPaginateAdoption> {
    const adoptions = await this.adoptionsRepository.findAll(
      user_id,
      status,
      isOng,
    );

    return adoptions;
  }
}

export default ListAdoptionService;
