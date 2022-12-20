import Adoption from '../entities/Adoption';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Adoption)
export class AdoptionsRepository extends Repository<Adoption> {
  public async findById(
    id: string,
    user_id: string,
    isOng: boolean,
  ): Promise<Adoption | undefined> {
    if (isOng) {
      const adoption = await this.findOne({
        where: {
          id,
          ong_id: user_id,
        },
      });

      return adoption;
    } else {
      const adoption = await this.findOne({
        where: {
          id,
          adopter_id: user_id,
        },
      });

      return adoption;
    }
  }
}
