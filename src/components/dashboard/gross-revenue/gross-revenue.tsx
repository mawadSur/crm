import React from 'react';
import { ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts';

const pdata = [
  {
    name: 'Jan',
    revenue: 20,
  },
  {
    name: 'Feb',
    revenue: 10,
  },
  {
    name: 'Mar',
    revenue: 23,
  },
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
    revenue: 7,
  },
];

const GrossRevenue = () => {
  return (
    <React.Fragment>
      <h1>Gross Revenue</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default GrossRevenue;
