import { ResourceWithOptions } from 'adminjs';
import { ActivityModel } from '../models/index.js';

export const activityResource: ResourceWithOptions = {
  resource: ActivityModel,
  options: {
    id: 'activities',
    navigation: {
      icon: 'Activity',
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
    properties: {
      createdAt: {
        isVisible: { show: true, edit: false, list: true },
      },
      updatedAt: {
        isVisible: { show: true, edit: false, list: true },
      },
    },
  },
};
