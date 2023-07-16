import { ResourceWithOptions } from 'adminjs';
import importExportFeature from '@adminjs/import-export';
import { CustomerModel } from '../models/index.js';
import { componentLoader } from '../components/index.js';

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
  features: [importExportFeature({ componentLoader })],
};
