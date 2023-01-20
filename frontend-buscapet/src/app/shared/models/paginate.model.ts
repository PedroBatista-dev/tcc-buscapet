export class Paginate<T> {
  from?: number;
  to?: number;
  per_page?: number;
  total?: number;
  current_page?: number;
  prev_page?: number;
  next_page?: number;
  data?: T[];
}
