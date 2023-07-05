import React from 'react';
import { SalesVolume } from './sales-volume/index.js';
import GrossRevenue from './gross-revenue/gross-revenue.js';
import InventoryTumoverRate from './Inventory-tumover-rate/inventory-tumover-rate.js';

const Dashboard = () => {
  return (
    <React.Fragment>
      <SalesVolume />
      <GrossRevenue />
      <InventoryTumoverRate />
    </React.Fragment>
  );
};

export default Dashboard;
