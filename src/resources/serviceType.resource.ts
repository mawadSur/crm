import { ResourceWithOptions } from 'adminjs';
import { ServiceType } from '../models/index.js';

export const serviceTypeResource: ResourceWithOptions = {
  resource: ServiceType,
  options: {
    id: 'ServiceTypes',
    navigation: {
      icon: 'List',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {
      createdAt: {
        isVisible: { show: true, edit: false, list: true },
      },
      updatedAt: {
        isVisible: { show: true, edit: false, list: true },
      },
    },
  },
};
