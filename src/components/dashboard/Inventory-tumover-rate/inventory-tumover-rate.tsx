import React from 'react';
import { ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';

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

const InventoryTumoverRate = () => {
  return (
    <React.Fragment>
      <h1>Inventory Tumover Rate</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart data={pdata}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey="tumoverRate" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default InventoryTumoverRate;
