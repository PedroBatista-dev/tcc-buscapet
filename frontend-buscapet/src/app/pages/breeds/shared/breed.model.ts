import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Specie } from '../../species/shared/specie.model';

export class Breed extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string,
    public specie?: Specie
  ){
    super();
  }

  static fromJson(jsonData: any): Breed {
    return Object.assign(new Breed(), jsonData);
  }
}
