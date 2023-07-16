import { ResourceWithOptions } from 'adminjs';
import importExportFeature from '@adminjs/import-export';
import { SalesRepModel } from '../models/index.js';
import { componentLoader } from '../components/index.js';

export const salesRepResource: ResourceWithOptions = {
  resource: SalesRepModel,
  options: {
    id: 'sales-reps',
    navigation: {
      icon: 'UserCheck',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {},
  },
  features: [importExportFeature({ componentLoader })],
};
