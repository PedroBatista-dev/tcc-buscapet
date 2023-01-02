import { ISpecie } from '@modules/species/domain/models/ISpecie';

export interface IBreed {
  id: string;
  name: string;
  specie_id: string;
  specie: ISpecie;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
