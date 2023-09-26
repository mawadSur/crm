import React, { useState, useEffect } from 'react';
import { FunnelChart, Tooltip, Funnel, Cell, ResponsiveContainer } from 'recharts';
import FollowUpStyle from './style.js';
import CustomersList from './CustomerList.js';
import { FunnelProps } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19', '#215a9f']; // sample colors, adjust as necessary

const FollowUp = () => {
  const [data, setData] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  // Load animation by populating data after a delay (using useEffect and useState)
  const updateDataWithCounts = (customerCounts) => {
    const funnelData = [
      { value: customerCounts.totalCustomers, name: 'Sent message' },
      { value: customerCounts.positiveResponseCount, name: 'Positive Response' },
      { value: customerCounts.madeAppointmentCount, name: 'Made Appointment' },
      { value: customerCounts.visitedStoreCount, name: 'Visited Store' },
      { value: customerCounts.purchaseCount, name: 'Purchased' },
    ];
    setTimeout(() => setData(funnelData), 500); // simulating loading data with a delay
  };

  const handleSectionClick = (data: any, index: number) => {
    setSelectedSection(data.name); // Update selected section
    console.log(data);
  };

  return (
    <div>
      <FollowUpStyle.ContainerFollowUp>
        <FollowUpStyle.Card>
          <FollowUpStyle.Title>Follow Up Page</FollowUpStyle.Title>
        </FollowUpStyle.Card>
      </FollowUpStyle.ContainerFollowUp>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width="50%" height={400}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              data={data}
              dataKey="value"
              nameKey="name"
              onClick={handleSectionClick as FunnelProps['onClick']}
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
        <CustomersList onDataUpdate={updateDataWithCounts} selectedSection={selectedSection} />
      </div>
    </div>
  );
};

export default FollowUp;
