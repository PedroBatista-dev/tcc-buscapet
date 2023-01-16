import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Session extends BaseResourceModel{
  constructor(
    public email?: string,
    public password?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): Session {
    return Object.assign(new Session(), jsonData);
  }
}
