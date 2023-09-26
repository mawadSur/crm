import { ResourceWithOptions } from 'adminjs';
import importExportFeature from '@adminjs/import-export';
import { CarModel, CustomerModel } from '../models/index.js';
import { Components, componentLoader } from '../components/index.js';

export const customerResource: ResourceWithOptions = {
  resource: CustomerModel,
  options: {
    id: 'customers',
    navigation: {
      name: 'Customers',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {
      relationships: {
        isVisible: { show: true, edit: false, list: false },
        reference: 'customers',
      },
      createdAt: {
        isVisible: { show: true, edit: false, list: true },
      },
      updatedAt: {
        isVisible: { show: true, edit: false, list: true },
      },
    },
  },

  features: [importExportFeature({ componentLoader })],
};
