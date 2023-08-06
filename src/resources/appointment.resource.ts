import importExportFeature from '@adminjs/import-export';
import { ResourceWithOptions } from 'adminjs';
import { AppointmentModel } from '../models/index.js';
import { componentLoader } from '../components/index.js';

export const appointmentResource: ResourceWithOptions = {
  resource: AppointmentModel,
  options: {
    id: 'Appointments',
    navigation: {
      icon: 'Phone',
    },
    properties: {
      id: {
        isVisible: { show: true, edit: false, list: true },
      },
      salesRepId: {
        reference: 'SalesRep',
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
      carId: {
        reference: 'Car',
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
