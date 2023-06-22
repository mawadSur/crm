import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import { Database, Resource } from '@adminjs/mongoose'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { CarModel, CustomerModel, SalesRepModel } from './model.js'
dotenv.config()

const PORT = 3123;

// We'll need to register the mongoose Adapter
AdminJS.registerAdapter({
  Database,
  Resource
})

const start = async () => {
  const app = express();
  
  // This facilitates the connection to the mongo database
  await mongoose.connect(`${process.env.MONGO_URL}`)

  const admin = new AdminJS({
    resources: [
      {
        resource: SalesRepModel
      },
      {
        resource: CustomerModel
      },
      {
        resource: CarModel
      }
    ],
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
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
