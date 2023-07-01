import { ResourceWithOptions } from 'adminjs';
import { SalesRepModel } from '../models/index.js';

export const salesRepResource: ResourceWithOptions = {
  resource: SalesRepModel,
  options: {
    id: 'sales-reps',
    navigation: {
      icon: 'UserCheck',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {},
  },
};
