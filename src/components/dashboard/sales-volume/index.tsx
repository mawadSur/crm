import React from 'react';

// Chart Components
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Common Components
import { Card, Title } from '../../../components/common/index.js';

const SalesVolume = React.memo(() => {
  const [salesVolumeData, setSalesVolumeData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3434/api/salesVolumes');
        console.log('response', response);
        const data = await response.json();
        setSalesVolumeData(data);
      } catch (error) {
        console.error('Error fetching sales volumes:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <Title>Sales Volume</Title>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart data={(salesVolumeData as any).items}>
          <XAxis dataKey="name" interval={'preserveStartEnd'} />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="newCars" fill="#8884d8" />
          <Bar dataKey="usedCars" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

export default SalesVolume;
