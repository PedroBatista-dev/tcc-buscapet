import { ISpecie } from '@modules/species/domain/models/ISpecie';

export interface ICreateBreed {
  name: string;
  specie: ISpecie;
  user_id: string;
}
