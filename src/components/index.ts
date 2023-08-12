import { ComponentLoader } from 'adminjs';

export const componentLoader = new ComponentLoader();

export const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard/index.js'),
  Calculator: componentLoader.add('Calculator', './calculator/index.js'),
  Chat: componentLoader.add('Customers', './conversation/customersList.js'),
  Campaign: componentLoader.add('Campaign', './campaign/index.js'),
  FollowUp: componentLoader.add('Followup', './followUp/index.js'),
};
