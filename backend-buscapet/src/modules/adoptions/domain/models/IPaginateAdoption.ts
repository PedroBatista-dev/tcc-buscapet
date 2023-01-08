import { IAdoption } from './IAdoption';

export interface IPaginateAdoption {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: IAdoption[];
}
