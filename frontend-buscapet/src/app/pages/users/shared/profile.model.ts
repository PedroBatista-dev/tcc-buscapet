import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Profile extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string,
    public email?: string,
    public isOng?: boolean,
    public cpf?: string,
    public cnpj?: string,
    public password?: string,
    public old_password?: string,
    public password_confirmation?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): Profile {
    return Object.assign(new Profile(), jsonData);
  }
}
