import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Breed } from '../../breeds/shared/breed.model';
import { Color } from '../../colors/shared/color.model';
import { Specie } from '../../species/shared/specie.model';
import { Vaccine } from '../../vaccines/shared/vaccine.model';

export class Animal extends BaseResourceModel{
  constructor(
    public override id?: string,
    public name?: string,
    public age?: number,
    public sex?: string,
    public size?: string,
    public status?: string,
    public other_animals?: string,
    public avatar?: string,
    public color?: Color,
    public breed?: Breed,
    public vaccines?: Vaccine[],
    public specie?: Specie,
  ){
    super();
  }

  static fromJson(jsonData: any): Animal {
    return Object.assign(new Animal(), jsonData);
  }
}
