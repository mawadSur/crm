export const ENV_VARIABLES = {
  APP_URL: process.env.PROD_APP_URL || process.env.APP_URL || 'http://localhost:3434',
  API_URL: process.env.PROD_API_URL || process.env.API_URL || 'http://localhost:3434/api',
};
