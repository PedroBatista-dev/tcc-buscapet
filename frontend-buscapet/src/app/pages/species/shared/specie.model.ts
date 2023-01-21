import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Specie extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string
  ){
    super();
  }

  static fromJson(jsonData: any): Specie {
    return Object.assign(new Specie(), jsonData);
  }
}
