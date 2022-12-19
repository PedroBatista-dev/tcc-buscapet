import Adoption from '../entities/Adoption';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Adoption)
export class AdoptionsRepository extends Repository<Adoption> {
  public async findById(
    id: string,
    ong_id: string,
  ): Promise<Adoption | undefined> {
    const adoption = await this.findOne({
      where: {
        id,
        ong_id,
      },
    });

    return adoption;
  }

  public async findByIdAndStatus(
    id: string,
    ong_id: string,
    status: string,
  ): Promise<Adoption | undefined> {
    const adoption = await this.findOne({
      where: {
        id,
        ong_id,
        status,
      },
    });

    return adoption;
  }
}
