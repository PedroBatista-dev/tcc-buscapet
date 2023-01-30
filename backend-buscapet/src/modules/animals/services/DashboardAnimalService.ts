import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  isOng: boolean;
  text: string;
}

@injectable()
class DashboardAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ user_id, isOng, text }: IRequest): Promise<any> {
    const dashboard = await this.animalsRepository.findDashboard(
      user_id,
      isOng,
      text,
    );

    return dashboard;
  }
}

export default DashboardAnimalService;
