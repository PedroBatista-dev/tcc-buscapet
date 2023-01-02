import { IBreed } from '@modules/breeds/domain/models/IBreed';
import { IColor } from '@modules/colors/domain/models/IColor';
import { ISpecie } from '@modules/species/domain/models/ISpecie';
import { ICreateAnimalsVaccines } from './ICreateAnimalsVaccines';

export interface ICreateAnimal {
  name: string;
  age: number;
  sex: string;
  size: string;
  status: string;
  other_animals: string;
  color: IColor;
  breed: IBreed;
  specie: ISpecie;
  animals_vaccine: ICreateAnimalsVaccines[];
  user_id: string;
}
