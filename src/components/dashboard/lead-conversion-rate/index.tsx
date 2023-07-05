import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardTitle, Flex, Section, ValueText } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'Jul',
    rate: 100,
  },
  {
    name: 'Aug',
    rate: 100,
  },
  {
    name: 'Sep',
    rate: 100,
  },
  {
    name: 'Oct',
    rate: 100,
  },
  {
    name: 'Nov',
    rate: 100,
  },
  {
    name: 'Dev',
    rate: 100,
  },
];

const LeadConversionRate = () => {
  return (
    <Card>
      <CardTitle>Lead Conversion Rate</CardTitle>
      <Flex $marginTop="20px">
        <Section $padding="0px" $width="30%" $height="70px">
          <ValueText>100%</ValueText>
        </Section>
        <Section $padding="0px" $width="60%" $height="70px">
          <ResponsiveContainer width="100%" height="100px" aspect={3}>
            <BarChart data={pdata} barSize={12}>
              <Tooltip />
              <Bar type="monotone" dataKey="rate" fill="#f89e97" />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </Flex>
    </Card>
  );
};

export default LeadConversionRate;
