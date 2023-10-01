import { ComponentLoader } from 'adminjs';

export const componentLoader = new ComponentLoader();

export const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard/index.js'),
  Calculator: componentLoader.add('Calculator', './calculator/index.js'),
  Campaign: componentLoader.add('Campaign', './campaign/index.js'),
  FollowUp: componentLoader.add('Followup', './followUp/index.js'),
  UploadCarImage: componentLoader.add('UploadCarImage', './uploadCarImage/index.js'),
  Chat: componentLoader.add('Chat', './conversation/customersList.js'),

  //! Cars
  CarImages: componentLoader.add('CarImages', './carImages/index.js'),
  SearchVin: componentLoader.add('SearchVin', './searchVin/index.js'),

  //! Customers
  CustomerReferences: componentLoader.add(
    'CustomerReferences',
    './customers/customerReferences/index.js',
  ),

  //! Blast
  BlastNewest: componentLoader.add('BlastNewest', './blastNewest/index.js'),

  //! Common components
  ChatProxy: componentLoader.add('chatProxy', './common/chatProxy/index.js'),
};
