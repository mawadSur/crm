import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { componentLoader } from '../components/index.js';
import { CustomerServiceModel } from '../models/index.js';

export const customerService: ResourceWithOptions = {
  resource: CustomerServiceModel,
  options: {
    id: 'customerServices',
    navigation: {
      name: 'Customers',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {
      customerId: {
        isVisible: { show: true, edit: true, list: false },
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
