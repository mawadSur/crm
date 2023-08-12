const path = require('path');

module.exports = {
  apps: [
    {
      name: 'crm',
      script: path.resolve(__dirname, 'dist/index.js'),
      interpreter: 'node',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        instances: 'max',
        DATABASE_URL: 'your-production-database-url',
        SECRET_KEY: 'your-production-secret-key',
      },
    },
  ],
};
