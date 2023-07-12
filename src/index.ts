import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import * as dotenv from 'dotenv';
import express from 'express';
import { Components, componentLoader } from './components/index.js';
import { Database as CoreDB } from './core/database/index.js';
import { carResource, customerResource, salesRepResource } from './resources/index.js';
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

  const database = new CoreDB(process.env.MONGO_URL as string);
  await database.connect();

  const admin = new AdminJS({
    componentLoader,
    resources: [salesRepResource, customerResource, carResource],
    dashboard: {
      component: Components.Dashboard,
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

  // const adminRouter = AdminJSExpress.buildRouter(admin);
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
    }
  );
  app.use(admin.options.rootPath, adminAuthRouter);

  app.listen(PORT, () => {
    console.log(`🚀 AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
