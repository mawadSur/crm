import React from 'react';

//! Components
import GrossRevenue from './gross-revenue/index.js';
import SalesVolume from './sales-volume/index.js';
import InventoryTurnoverRate from './inventory-turnover-rate/index.js';
import AverageDayInventory from './average-days-inventory/index.js';

//! Common Components
import { Card, Flex, Page, Section } from '../common/index.js';
import LeadConversionRate from './lead-conversion-rate/index.js';

const Dashboard: React.FC = () => {
  return (
    <Page>
      <SalesVolume />
      <Flex>
        <Section $width="24%">
          <GrossRevenue />
        </Section>
        <Section $width="24%">
          <InventoryTurnoverRate />
        </Section>
        <Section $width="24%">
          <AverageDayInventory />
        </Section>
        <Section $width="24%">
          <LeadConversionRate />
        </Section>
      </Flex>
    </Page>
  );
};

export default Dashboard;
