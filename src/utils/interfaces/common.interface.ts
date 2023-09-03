export interface IQuery {
  query?: any;
  limit: number;
  offset: number;
}

export type Order = 'asc' | 'desc';
