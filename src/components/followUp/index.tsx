import React, { useState, useEffect } from 'react';
import { FunnelChart, Tooltip, Funnel, Cell, ResponsiveContainer } from 'recharts';
import followUpStyle from './style.js';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19']; // sample colors, adjust as necessary

const FollowUp = () => {
  const [data, setData] = useState([]);

  // Load animation by populating data after a delay (using useEffect and useState)
  useEffect(() => {
    const fetchData = [
      { value: 100, name: 'Sent message' },
      { value: 80, name: 'Postive Response' },
      { value: 50, name: 'Made Appointment' },
      { value: 20, name: 'Visited Store' },
    ];

    setTimeout(() => setData(fetchData), 500); // simulating loading data with a delay
  }, []);

  const handleClick = (data, index) => {
    alert(`${data.name}: ${data.value}`);
  };

  return (
    <div>
      <h1>Follow Up Page</h1>
      <ResponsiveContainer width="80%" height={400}>
        <FunnelChart>
          <Tooltip />
          <Funnel
            data={data}
            dataKey="value"
            nameKey="name"
            // onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                cursor="pointer"
                stroke="none"
                strokeWidth={1}
                fillOpacity={0.7}
                onMouseEnter={() => {}}
              />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FollowUp;
