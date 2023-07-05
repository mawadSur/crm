import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardTitle, Flex, Section, ValueText } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'cate1',
    tumoverRate: 20,
  },
  {
    name: 'cate2',
    tumoverRate: 10,
  },
  {
    name: 'cate3',
    tumoverRate: 23,
  },
  {
    name: 'cate4',
    tumoverRate: 20,
  },
  {
    name: 'cate5',
    tumoverRate: 4,
  },
  {
    name: 'cate6',
    tumoverRate: 7,
  },
];

const InventoryTurnoverRate = () => {
  return (
    <Card>
      <CardTitle>Inventory Tumover Rate</CardTitle>
      <Flex $marginTop="20px">
        <Section $padding="0px" $width="30%" $height="70px">
          <ValueText>10%</ValueText>
        </Section>
        <Section $padding="0px" $width="60%" $height="70px">
          <ResponsiveContainer width="100%" height="100px" aspect={3}>
            <BarChart data={pdata} barSize={12}>
              <Tooltip />
              <Bar type="monotone" dataKey="tumoverRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </Flex>
    </Card>
  );
};

export default InventoryTurnoverRate;
