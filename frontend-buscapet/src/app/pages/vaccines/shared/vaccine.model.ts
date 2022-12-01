import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Vaccine extends BaseResourceModel{
  constructor(
    public override id: number,
    public name: string
  ){
    super();
  }
}
