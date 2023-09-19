import { ApiClient } from 'adminjs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cell, Funnel, FunnelChart, ResponsiveContainer, Tooltip } from 'recharts';
import BlastNewest from '../blastNewest/index.js';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19']; // sample colors, adjust as necessary

const FollowUp = () => {
  const api = new ApiClient();
  const [data, setData] = useState([]);
  const location = useLocation();
  const [apiURI, setApiURI] = React.useState('');

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

  React.useEffect(() => {
    const fetchServerSide = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'blast',
        });

        const { data } = response;

        if (data?.apiURI) {
          setApiURI(data.apiURI);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchServerSide();
  }, []);

  React.useEffect(() => {
    let sentMessage = 0;
    if (location?.state?.total > 0) {
      sentMessage = location.state.total;
    } else {
      if (!apiURI) return;
      (async () => {
        const response = await fetch(`${apiURI}/blasts/newest?limit=10&offset=0`);
        const data = await response.json();
        if (data?.total) sentMessage = data.total;
      })();
    }
    console.log('sentMessage', sentMessage);
    if (sentMessage > 0) {
      const indexOfSentMessage = data.findIndex((item) => item.name === 'Sent message');
      console.log('indexOfSentMessage', indexOfSentMessage);
      if (indexOfSentMessage > -1) {
        data[indexOfSentMessage].value = sentMessage;
        setData([...data]);
      }
    }
  }, [location?.state, apiURI, data.length]);

  // const handleClick = (data, index) => {
  //   alert(`${data.name}: ${data.value}`);
  // };

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

      <BlastNewest caption="Customers" />
    </div>
  );
};

export default FollowUp;
