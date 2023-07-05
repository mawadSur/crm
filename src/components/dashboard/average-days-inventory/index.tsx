import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardTitle, Flex, Section, ValueText } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'Apr',
    days: 20,
  },
  {
    name: 'May',
    days: 7,
  },
  {
    name: 'Jun',
    days: 25,
  },
  {
    name: 'Ju7',
    days: 14,
  },
];

const AverageDayInventory = () => {
  return (
    <Card>
      <CardTitle>Average Days in Inventory</CardTitle>
      <Flex $marginTop="20px">
        <Section $padding="0px" $width="30%" $height="70px">
          <ValueText $lineHeight="30px">10 Days</ValueText>
        </Section>
        <Section $padding="0px" $width="60%" $height="70px">
          <ResponsiveContainer width="100%" height="100px" aspect={3}>
            <AreaChart data={pdata}>
              <defs>
                <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9aeef3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9aeef3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="days"
                stroke="#9aeef3"
                fillOpacity={0.5}
                fill="url(#colorUv1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
      </Flex>
    </Card>
  );
};

export default AverageDayInventory;
