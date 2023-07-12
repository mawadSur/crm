import dotenv from 'dotenv';
import { Database } from '../index.js';
dotenv.config();

const db = new Database(process.env.DATABASE_URL as string);
db.connect();

const script = async () => {};

script().then(() => {
  db.close();
});
