import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Quiz extends BaseResourceModel{
  constructor(
    public override id?: string,
    public birth_date?: Date,
    public marital_status?: string,
    public professional_activity?: string,
    public address?: string,
    public complement?: string,
    public district?: string,
    public city?: string,
    public state?: string,
    public cep?: string,
    public profile_instragam?: string,
    public for_who?: string,
    public why_adopt?: string,
    public average_life?: boolean,
    public financial_conditions?: boolean,
    public user_id?: string,
    public created_at?: Date,
    public updated_at?: Date
  ){
    super();
  }

  static fromJson(jsonData: any): Quiz {
    return Object.assign(new Quiz(), jsonData);
  }
}
