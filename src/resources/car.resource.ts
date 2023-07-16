import { ResourceWithOptions } from 'adminjs';
import importExportFeature from '@adminjs/import-export';
import { CarModel } from '../models/index.js';
import { componentLoader } from '../components/index.js';

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
  features: [importExportFeature({ componentLoader })],
};
