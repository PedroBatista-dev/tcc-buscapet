import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Forgot extends BaseResourceModel{
  constructor(
    public email?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): Forgot {
    return Object.assign(new Forgot(), jsonData);
  }
}
