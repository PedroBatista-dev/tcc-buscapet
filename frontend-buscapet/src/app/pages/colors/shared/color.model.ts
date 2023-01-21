import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Color extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string
  ){
    super();
  }

  static fromJson(jsonData: any): Color {
    return Object.assign(new Color(), jsonData);
  }
}
