import dotenv from 'dotenv';
import { Database } from '../index.js';
import { seedAdmin } from './admin.seed.js';
dotenv.config();

const db = new Database(process.env.MONGO_URL as string);
db.connect();
const seed = async () => {
  await Promise.allSettled([seedAdmin()]);
};

seed().then(() => {
  db.close();
});
