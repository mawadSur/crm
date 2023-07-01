import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { carResource, customerResource, salesRepResource } from './resources/index.js';
dotenv.config();

const PORT = process.env.PORT || 3123;

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource,
});

const start = async () => {
  const app = express();

  // This facilitates the connection to the mongo database
  await mongoose.connect(`${process.env.MONGO_URL}`);

  const admin = new AdminJS({
    resources: [salesRepResource, customerResource, carResource],
    branding: {
      companyName: 'Pegasus',
      favicon: '../public/icon.jpg',
    },
    version: {
      admin: true,
    },
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`🚀 AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
