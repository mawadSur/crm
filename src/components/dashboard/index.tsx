import React from 'react';

//! Components
import AppointmentsToday from './appointments/index.js';
import AverageDayInventory from './average-days-inventory/index.js';
import DeskLog from './desklog/index.js';
import GrossRevenue from './gross-revenue/index.js';
import InventoryTurnoverRate from './inventory-turnover-rate/index.js';
import SalesVolume from './sales-volume/index.js';

//! Common Components
import { Flex, Page, Section } from '../common/index.js';
import LeadConversionRate from './lead-conversion-rate/index.js';

const Dashboard: React.FC = () => {
  return (
    <Page>
      <Flex>
        <Section $width="60%">
          <AppointmentsToday />
        </Section>
        <Section $width="40%">
          <SalesVolume />
        </Section>
      </Flex>
      <Flex>
        <DeskLog />
      </Flex>
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
