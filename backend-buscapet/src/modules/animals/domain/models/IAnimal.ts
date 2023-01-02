import { IBreed } from '@modules/breeds/domain/models/IBreed';
import { IColor } from '@modules/colors/domain/models/IColor';
import { ISpecie } from '@modules/species/domain/models/ISpecie';
import { ICreateAnimalsVaccines } from './ICreateAnimalsVaccines';

export interface IAnimal {
  id: string;
  name: string;
  age: number;
  sex: string;
  size: string;
  status: string;
  other_animals: string;
  avatar: string;
  color_id: string;
  color: IColor;
  breed_id: string;
  breed: IBreed;
  specie_id: string;
  specie: ISpecie;
  user_id: string;
  animals_vaccine: ICreateAnimalsVaccines[];
  created_at: Date;
  updated_at: Date;
}
