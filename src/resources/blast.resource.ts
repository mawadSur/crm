import { ResourceWithOptions } from 'adminjs';
import { BlastModel } from '../models/index.js';
import { Components } from '../components/index.js';

export const blastResource: ResourceWithOptions = {
  resource: BlastModel,
  options: {
    id: 'blast',
    navigation: {
      icon: 'Volume2',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    actions: {
      new: {
        isVisible: false,
      },
      edit: {
        isVisible: false,
      },
    },
    properties: {
      customerId: {
        reference: 'customers',
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
        components: {
          list: Components.CustomerReferences,
          show: Components.CustomerReferences,
        },
      },
    },
  },
};
