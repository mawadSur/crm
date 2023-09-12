const path = require('path');

module.exports = {
  apps: [
    {
      name: 'crm',
      script: path.resolve(__dirname, 'dist/index.js'),
      interpreter: 'node',
      instances: '1',
      autorestart: true,
      watch: false,
      max_memory_restart: '4G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
