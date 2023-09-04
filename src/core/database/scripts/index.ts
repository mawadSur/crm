import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    const script = async () => {
      //TODO add script logic to modify database
    };

    script().then(() => {
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.log('🧨 Connection database error', error);
  });
