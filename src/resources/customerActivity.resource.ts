import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { componentLoader } from '../components/index.js';
import { CustomerActivityModel, CustomerVehicleModel } from '../models/index.js';

export const customerActivityResource: ResourceWithOptions = {
  resource: CustomerActivityModel,
  options: {
    id: 'customerActivities',
    navigation: {
      name: 'Customers',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {
      customerId: {
        isVisible: { show: true, edit: true, list: true },
        reference: 'customers',
      },
      activityId: {
        isVisible: { show: true, edit: true, list: true },
        reference: 'activities',
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
