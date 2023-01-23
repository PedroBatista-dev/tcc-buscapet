import { inject, injectable } from 'tsyringe';
import { IAdoption } from '../domain/models/IAdoption';
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
  }: IRequest): Promise<IAdoption[]> {
    const adoptions = await this.adoptionsRepository.findAll(
      user_id,
      status,
      isOng,
    );

    return adoptions;
  }
}

export default ListAdoptionService;
