import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Dashboard extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string
  ){
    super();
  }

  static fromJson(jsonData: any): Dashboard {
    return Object.assign(new Dashboard(), jsonData);
  }
}
