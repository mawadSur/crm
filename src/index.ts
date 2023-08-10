import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import * as dotenv from 'dotenv';
import express from 'express';
import { Components, componentLoader } from './components/index.js';
import { Database as CoreDB } from './core/database/index.js';
import {
  appointmentResource,
  carResource,
  customerResource,
  desklogResource,
  salesRepResource,
} from './resources/index.js';
import { BaseRoute } from './routes/index.js';
import { adminAuthenticate } from './services/auth.service.js';

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
      carResource,
      appointmentResource,
      desklogResource,
    ],
    dashboard: {
      component: Components.Dashboard,
    },
    pages: {
      calculator: {
        // name, will be used to build an URL
        handler: async (request, response, context) => {
          // fetch values from your database
          // const value = await Car.find({});
          // return { data: { inventory: car.value } };
        },
        component: Components.Calculator,
        icon: 'Plus',
      },
      campaign: {
        // name, will be used to build an URL
        handler: async (request, response, context) => {
          // fetch values from your database
          // const value = await Car.find({});
          // return { data: { inventory: car.value } };
        },
        component: Components.Campaign,
        icon: 'Campaign',
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
      resave: true,
      saveUninitialized: true,
      secret: 'Secret',
      name: 'adminjs',
    },
  );

  app.use('/api', route.router);

  app.use(
    admin.options.rootPath,
    process.env.NODE_ENV === 'development' ? adminRouter : adminAuthRouter,
  );

  app.listen(PORT, () => {
    console.log(`🚀 AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
