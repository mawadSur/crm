import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CustomerModel } from '../../../models/customer.model.js';
import { CustomerInsuranceModel } from '../../../models/customerInsurance.model.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    const script = async () => {
      //TODO add script logic to modify database
      const customers = await CustomerModel.find().lean().exec();
      for await (const customer of customers) {
        new CustomerInsuranceModel({
          policyType: 'Car Insurance',
          policyNumber: '12345',
          expiryDate: new Date(),
          customerId: customer._id,
        }).save();
        await new CustomerInsuranceModel({
          policyType: 'Health Insurance',
          policyNumber: '67890',
          expiryDate: new Date(),
          customerId: customer._id,
        }).save();
      }
    };

    script().then(() => {
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log('🧨 Connection database error', error);
  });
