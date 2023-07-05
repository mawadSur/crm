import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard/dashboard.js'),
};

export { componentLoader, Components };
