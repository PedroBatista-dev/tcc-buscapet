import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Dashboard extends BaseResourceModel{
  constructor(
    public name?: never,
    public count?: never,
    public status?: never,
  ){
    super();
  }

  static fromJson(jsonData: any): Dashboard {
    return Object.assign(new Dashboard(), jsonData);
  }
}
