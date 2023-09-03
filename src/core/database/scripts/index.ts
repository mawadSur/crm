import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    const script = async () => {
      //TODO add script logic to modify database
      // const customers = await CustomerModel.find().exec();
      // // Create an array of update operations
      // const updateOperations = customers.map((customer) => {
      //   const otherContact = {
      //     name: customer.name,
      //     phone: customer.cellNumber,
      //     email: customer.email,
      //   };
      //   return {
      //     updateOne: {
      //       filter: { _id: customer._id }, // Use the customer's _id as the filter
      //       update: { $set: { otherContacts: [otherContact] } },
      //     },
      //   };
      // });
      // // Use bulkWrite to update all customers in a single operation
      // await CustomerModel.bulkWrite(updateOperations);
    };

    script().then(() => {
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log('🧨 Connection database error', error);
  });
