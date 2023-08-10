import React, { useState, useEffect } from 'react';
import { FunnelChart, Tooltip, Funnel, Cell, LabelList, ResponsiveContainer } from 'recharts';
import followUpStyle from './style.js';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19'];

const FollowUp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = [
      { value: 100, name: 'Sent message' },
      { value: 80, name: 'Postive Response' },
      { value: 50, name: 'Made Appointment' },
      { value: 20, name: 'Visited Store' },
    ];

    setTimeout(() => setData(fetchData), 500);
  }, []);

  const handleClick = (data, index) => {
    alert(`${data.name}: ${data.value}`);
  };

  return (
    <div style={{ height: '100vh' }}>
      <h1>Follow Up Page</h1>
      <ResponsiveContainer width="80%" height="100vh">
        <FunnelChart>
          <Tooltip />
          <Funnel
            data={data}
            dataKey="value"
            nameKey="name"
            // onClick={handleClick}
          >
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
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
