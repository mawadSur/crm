import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { componentLoader } from '../components/index.js';
import { DeskLogModel } from '../models/index.js';

export const desklogResource: ResourceWithOptions = {
  resource: DeskLogModel,
  options: {
    id: 'desklogs',
    navigation: {
      icon: 'List',
    },
    properties: {
      vehicleId: {
        reference: 'cars',
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
      customerId: {
        reference: 'customers',
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
      salesRepId: {
        reference: 'sales-reps',
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
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
