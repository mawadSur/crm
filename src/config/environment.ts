import * as dotenv from 'dotenv';
dotenv.config();

export const ENV_VARIABLES = {
  API_URI: process.env.API_URI || 'http://localhost:3434/api',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
