import { ResourceWithOptions } from 'adminjs';
import { CarModel } from '../models/index.js';

export const carResource: ResourceWithOptions = {
  resource: CarModel,
  options: {
    id: 'cars',
    navigation: {
      icon: 'Truck',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {},
  },
};
