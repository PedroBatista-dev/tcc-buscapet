import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Vaccine extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string,
    public vaccine?: Vaccine
  ){
    super();
  }

  static fromJson(jsonData: any): Vaccine {
    return Object.assign(new Vaccine(), jsonData);
  }
}
