import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { Components, componentLoader } from '../components/index.js';
import { ENV_VARIABLES } from '../config/environment.js';
import { CustomerModel } from '../models/index.js';

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
      // name: {
      //   isVisible: { show: true, edit: true, list: true },
      //   components: {
      //     show: Components.CustomerName,
      //   },
      // },
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
    actions: {
      chat: {
        actionType: 'record',
        component: Components.ChatProxy,
        handler: async (req, res, context) => {
          return {
            record: {
              apiURI: ENV_VARIABLES.API_URI,
              ...context.record.toJSON(),
              redirectPath: 'admin/pages/Chat',
            },
          };
        },
      },
    },
  },

  features: [importExportFeature({ componentLoader })],
};
