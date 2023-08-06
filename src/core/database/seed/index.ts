import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedAdmin } from './admin.seed.js';
import { seedAppointment } from './appointment.seed.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('seed db starting');
    const seed = async () => {
      await Promise.allSettled([seedAdmin(), seedAppointment()]);
    };
    seed().then(() => {
      console.log('seed db stopped');
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log('🧨 Connection database error', error);
  });
