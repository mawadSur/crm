import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { componentLoader } from '../components/index.js';
import { CustomerInsuranceModel } from '../models/index.js';

export const customerInsuranceResource: ResourceWithOptions = {
  resource: CustomerInsuranceModel,
  options: {
    id: 'customerInsurances',
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
