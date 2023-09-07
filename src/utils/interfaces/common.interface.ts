export interface IQuery {
  query?: any;
  limit?: number;
  offset?: number;
  unlimited?: boolean;
}

export type Order = 'asc' | 'desc';
