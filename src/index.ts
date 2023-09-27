import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import mongoStore from 'connect-mongo';
import * as dotenv from 'dotenv';
import express from 'express';
import { Components, componentLoader } from './components/index.js';
import { ENV_VARIABLES } from './config/environment.js';
import { Database as CoreDB } from './core/database/index.js';
import { CustomerModel } from './models/customer.model.js';
import {
  activityResource,
  appointmentResource,
  blastResource,
  carResource,
  customerActivityResource,
  customerInsuranceResource,
  customerResource,
  customerServiceResource,
  customerVehicleResource,
  desklogResource,
  salesRepResource,
  serviceTypeResource,
} from './resources/index.js';
import { BaseRoute } from './routes/index.js';
import { adminAuthenticate } from './services/auth.service.js';
import { BlastModel } from './models/blast.model.js';
import { BlastService } from './services/blast.service.js';
dotenv.config();

const PORT = process.env.PORT || 3123;

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource,
});

const start = async () => {
  const app = express();
  app.use(express.static('public'));
  const route = new BaseRoute();

  const database = new CoreDB(process.env.MONGO_URL as string);
  await database.connect();

  const admin = new AdminJS({
    componentLoader,
    resources: [
      salesRepResource,

      customerResource,
      customerServiceResource,
      customerInsuranceResource,
      customerVehicleResource,
      customerActivityResource,

      carResource,
      appointmentResource,
      desklogResource,
      blastResource,
      serviceTypeResource,
      activityResource,
    ],

    dashboard: {
      component: Components.Dashboard,
      handler: async () => {
        return {
          apiURI: ENV_VARIABLES.API_URI,
        };
      },
    },

    pages: {
      calculator: {
        // name, will be used to build an URL
        handler: async (request, response, context) => {
          return {
            apiURI: ENV_VARIABLES.API_URI,
          };
        },
        component: Components.Calculator,
        icon: 'Plus',
      },
      // chat: {
      //   handler: async (request, response, context) => {
      //     return { apiURI: ENV_VARIABLES.API_URI };
      //   },
      //   component: Components.Chat,
      //   icon: 'Plus',
      // },
      chat: {
        handler: async (request, response, context) => {
          return {
            apiURI: ENV_VARIABLES.API_URI,
          };
        },
        component: Components.Chat,
        icon: 'Plus',
      },
      campaign: {
        // name, will be used to build an URL
        handler: async (request, response, context) => {
          // fetch values from your database
          const customerCount = await CustomerModel.countDocuments();
          return { data: { customerCount }, apiURI: ENV_VARIABLES.API_URI };
        },
        component: Components.Campaign,
        icon: 'Zap',
      },
      followUp: {
        // name, will be used to build an URL
        handler: async (request, response, context) => {
          return {
            apiURI: ENV_VARIABLES.API_URI,
          };
        },
        component: Components.FollowUp,
        icon: 'BarChart2',
      },
      blast: {
        handler: async (request, response, context) => {
          return {
            apiURI: ENV_VARIABLES.API_URI,
          };
        },
        component: Components.BlastNewest,
        icon: 'Volume2',
      },
    },
    branding: {
      companyName: 'Pegasus',
      favicon: '/logo.jpeg',
      logo: '/logo.jpeg',
      withMadeWithLove: false,
    },
    settings: {
      defaultPerPage: 10,
    },
    assets: {
      styles: ['/sidebar.css', '/customModal.css'],
    },
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  const adminAuthRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: adminAuthenticate,
      cookieName: 'AdminJS',
      cookiePassword: 'Secret',
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: 'Secret',
      name: 'adminjs',
      store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
        ttl: 60 * 60 * 24,
      }),
    },
  );

  /* Watch for changes */
  if (process.env.NODE_ENV !== 'production') {
    admin.watch();
  } else {
    admin.initialize();
  }

  app.use(
    admin.options.rootPath,
    process.env.NODE_ENV === 'development' ? adminRouter : adminAuthRouter,
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', route.router);

  app.listen(PORT, () => {
    console.log(
      `🚀 AdminJS started on http://localhost:${PORT}${admin.options.rootPath} - with env ${process.env.NODE_ENV}`,
    );
  });
};

start();
