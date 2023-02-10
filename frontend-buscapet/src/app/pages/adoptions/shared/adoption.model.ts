import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Animal } from '../../animals/shared/animal.model';
import { User } from '../../users/shared/user.model';

export class Adoption extends BaseResourceModel{
  constructor(
    public override id?: string,
    public status?: string,
    public animal?: Animal,
    public ong?: User,
    public adopter?: User,
    public animal_id?: string,
    public created_at?: Date,
    public updated_at?: Date
  ){
    super();
  }

  static fromJson(jsonData: any): Adoption {
    return Object.assign(new Adoption(), jsonData);
  }
}
