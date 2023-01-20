import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class User extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public avatar?: string,
    public isOng?: boolean,
    public cpf?: string,
    public cnpj?: string,
  ){
    super();
  }

  static fromJson(jsonData: any): User {
    return Object.assign(new User(), jsonData);
  }
}
