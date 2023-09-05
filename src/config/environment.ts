export const ENV_VARIABLES = {
  API_URL: process.env.PROD_API_URL || process.env.API_URL || 'http://localhost:3434/api',
  APP_URL: 'http://54.242.249.213' || process.env.PROD_APP_URL || process.env.APP_URL, // making this change untill we find a fix
};
