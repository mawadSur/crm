import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardTitle, Flex, Section, ValueText } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'Apr',
    revenue: 20,
  },
  {
    name: 'May',
    revenue: 4,
  },
  {
    name: 'Jun',
    revenue: 23,
  },
  {
    name: 'Ju7',
    revenue: 10,
  },
];

const GrossRevenue = () => {
  return (
    <Card>
      <CardTitle>Gross Revenue</CardTitle>
      <Flex $marginTop="20px">
        <Section $padding="0px" $width="30%" $height="70px">
          <ValueText>100.00$</ValueText>
        </Section>
        <Section $padding="0px" $width="60%" $height="70px">
          <ResponsiveContainer width="100%" height="100px" aspect={3}>
            <AreaChart data={pdata}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fillOpacity={0.5}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Section>
      </Flex>
    </Card>
  );
};

export default GrossRevenue;
