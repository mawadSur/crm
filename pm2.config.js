module.exports = {
  apps: [
    {
      name: 'crm',
      script: 'dist/index.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
      },
      // ... other PM2 options you might need
    },
  ],
};
