import { inject, injectable } from 'tsyringe';
import { IPaginateVaccine } from '../domain/models/IPaginateVaccine';
import { IVaccinesRepository } from '../domain/repositories/IVaccinesRepository';

interface IRequest {
  user_id: string;
  name: string;
}

@injectable()
class ListVaccineService {
  constructor(
    @inject('VaccinesRepository')
    private vaccinesRepository: IVaccinesRepository,
  ) {}

  public async execute({ user_id, name }: IRequest): Promise<IPaginateVaccine> {
    const vaccines = await this.vaccinesRepository.findAll(user_id, name);

    return vaccines;
  }
}

export default ListVaccineService;
