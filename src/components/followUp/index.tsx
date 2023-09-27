import { ApiClient } from 'adminjs';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Cell, Funnel, FunnelChart, FunnelProps, ResponsiveContainer, Tooltip } from 'recharts';
import CustomersList from './CustomerList.js';
import FollowUpStyle from './style.js';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19', '#215a9f']; // sample colors, adjust as necessary

const FollowUp = () => {
  const api = new ApiClient();
  const [data, setData] = React.useState([]);
  const location = useLocation();
  const [apiURI, setApiURI] = React.useState('');
  const [selectedSection, setSelectedSection] = React.useState(null);

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
