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
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
