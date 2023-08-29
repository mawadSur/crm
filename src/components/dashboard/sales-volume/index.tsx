import React from 'react';

// Chart Components
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Common Components
import { Card, Title } from '../../../components/common/index.js';

const pdata = [
  {
    name: 'July 1',
    NewCars: 55,
    UsedCars: 60,
  },
  {
    name: 'July 2',
    NewCars: 58,
    UsedCars: 65,
  },
  {
    name: 'July 3',
    NewCars: 20,
    UsedCars: 25,
  },
  {
    name: 'July 4',
    NewCars: 22,
    UsedCars: 28,
  },
  {
    name: 'July 5',
    NewCars: 18,
    UsedCars: 30,
  },
  {
    name: 'July 6',
    NewCars: 15,
    UsedCars: 20,
  },
  {
    name: 'July 7',
    NewCars: 25,
    UsedCars: 30,
  },
  {
    name: 'July 8',
    NewCars: 50,
    UsedCars: 55,
  },
  {
    name: 'July 9',
    NewCars: 60,
    UsedCars: 58,
  },
  {
    name: 'July 10',
    NewCars: 17,
    UsedCars: 18,
  },
  {
    name: 'July 11',
    NewCars: 20,
    UsedCars: 24,
  },
  {
    name: 'July 12',
    NewCars: 16,
    UsedCars: 22,
  },
  {
    name: 'July 13',
    NewCars: 22,
    UsedCars: 30,
  },
  {
    name: 'July 14',
    NewCars: 26,
    UsedCars: 30,
  },
  {
    name: 'July 15',
    NewCars: 55,
    UsedCars: 60,
  },
  {
    name: 'July 16',
    NewCars: 60,
    UsedCars: 65,
  },
  {
    name: 'July 17',
    NewCars: 23,
    UsedCars: 30,
  },
  {
    name: 'July 18',
    NewCars: 25,
    UsedCars: 35,
  },
  {
    name: 'July 19',
    NewCars: 22,
    UsedCars: 28,
  },
  {
    name: 'July 20',
    NewCars: 18,
    UsedCars: 20,
  },
  {
    name: 'July 21',
    NewCars: 20,
    UsedCars: 26,
  },
  {
    name: 'July 22',
    NewCars: 58,
    UsedCars: 60,
  },
  {
    name: 'July 23',
    NewCars: 60,
    UsedCars: 70,
  },
  {
    name: 'July 24',
    NewCars: 24,
    UsedCars: 30,
  },
];

const SalesVolume = React.memo(() => {
  return (
    <Card>
      <Title>Sales Volume</Title>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart data={pdata}>
          <XAxis dataKey="name" interval={'preserveStartEnd'} />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="NewCars" fill="#8884d8" />
          <Bar dataKey="UsedCars" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

export default SalesVolume;
