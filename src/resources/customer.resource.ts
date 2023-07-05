import { ResourceWithOptions } from 'adminjs';
import { CustomerModel } from '../models/index.js';

export const customerResource: ResourceWithOptions = {
  resource: CustomerModel,
  options: {
    id: 'customers',
    navigation: {
      icon: 'Users',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {},
  },
};
