import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { Components, componentLoader } from '../components/index.js';
import { ENV_VARIABLES } from '../config/environment.js';
import { CarModel } from '../models/index.js';

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
    properties: {
      pictures: {
        isVisible: { show: true, edit: false, list: false },
        components: {
          show: Components.CarImages,
        },
      },
    },
    actions: {
      uploadImage: {
        actionType: 'record',
        component: Components.UploadCarImage,
        handler: async (req, res, context) => {
          const { record, currentAdmin } = context;
          return {
            record: { apiURI: ENV_VARIABLES.API_URI, ...record.toJSON(currentAdmin) },
          };
        },
      },
    },
  },
  features: [importExportFeature({ componentLoader })],
};
