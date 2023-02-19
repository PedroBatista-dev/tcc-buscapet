import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class ResetPassword extends BaseResourceModel{
  constructor(
    public senha?: string,
    public passwordConfirmation?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): ResetPassword {
    return Object.assign(new ResetPassword(), jsonData);
  }
}
