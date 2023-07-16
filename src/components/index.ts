import { ComponentLoader } from 'adminjs';

export const componentLoader = new ComponentLoader();

export const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard/index.js'),
  Calculator: componentLoader.add('Calculator', './calculator/index.js'),
};
