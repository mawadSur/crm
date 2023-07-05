import React from 'react';

//! Chart Components
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

//! Common Components
import { Card, Title } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'Jan',
    Toyota: 20,
    Audi: 10,
  },
  {
    name: 'Feb',
    Toyota: 10,
    Audi: 50,
  },
  {
    name: 'Mar',
    Toyota: 23,
    Audi: 55,
  },
  {
    name: 'Apr',
    Toyota: 20,
    Audi: 10,
  },
  {
    name: 'May',
    Toyota: 4,
    Audi: 5,
  },
  {
    name: 'Jun',
    Toyota: 7,
    Audi: 14,
  },
  {
    name: 'Jul',
    Toyota: 17,
    Audi: 4,
  },
  {
    name: 'Aug',
    Toyota: 32,
    Audi: 44,
  },
  {
    name: 'Sep',
    Toyota: 12,
    Audi: 29,
  },
  {
    name: 'Oct',
    Toyota: 12,
    Audi: 29,
  },
  {
    name: 'Nov',
    Toyota: 72,
    Audi: 16,
  },
  {
    name: 'Dev',
    Toyota: 100,
    Audi: 100,
  },
];

const SalesVolume = React.memo(() => {
  return (
    <Card>
      <Title>Sales Volume</Title>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart data={pdata}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" interval={'preserveStartEnd'} />
          {/* <YAxis></YAxis> */}
          <Legend />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Toyota"
            stroke="#8884d8"
            fillOpacity={0.5}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="Audi"
            stroke="#82ca9d"
            fillOpacity={0.5}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
});

export default SalesVolume;
