import React from 'react';
import { Cell, Funnel, FunnelChart, FunnelProps, ResponsiveContainer, Tooltip } from 'recharts';
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#fd6b19', '#215a9f'];

enum EChartKeys {
  SentMessage = 'Sent Message',
  PositiveResponse = 'Positive Response',
  MadeAppointment = 'Made Appointment',
  VisitedStore = 'Visited Store',
  Purchased = 'Purchased',
}

const BlastInformation = React.memo(({ blasts }: { blasts: any[] }) => {
  const [data, setData] = React.useState([]);
  const [selectedSection, setSelectedSection] = React.useState(null);

  const updateDataWithCounts = () => {
    const funnelData = [
      { value: 10, name: EChartKeys.SentMessage },
      { value: 50, name: EChartKeys.PositiveResponse },
      { value: 100, name: EChartKeys.MadeAppointment },
      { value: 150, name: EChartKeys.VisitedStore },
      { value: 200, name: EChartKeys.Purchased },
    ];
    setTimeout(() => setData(funnelData), 500); // simulating loading data with a delay
  };

  React.useEffect(() => {
    updateDataWithCounts();
  }, []);

  const handleSectionClick = (data: any, index: number) => {
    setSelectedSection(data.name); // Update selected section
    console.log(data);
  };

  const goToChatPage = React.useCallback(
    (customerId) => () => {
      if (!customerId) return;
      window.location.href = `/admin/resources/customers/records/${customerId}/chat`;
    },
    [],
  );

  const customers = React.useMemo(() => {
    return (
      blasts.map((blast) => {
        return blast?.customerId;
      }) || []
    );
  }, [blasts]);

  React.useEffect(() => {
    if (customers?.length === 0) return;
    const tmpDataChart = [...data];
    const indexOfSentCount = tmpDataChart.findIndex((item) => item.name === EChartKeys.SentMessage);
    tmpDataChart[indexOfSentCount].value = customers.length;
    setData(tmpDataChart);
  }, [customers]);

  if (!blasts?.length)
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        Blast information empty
      </p>
    );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
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

      <div style={{ width: '50%' }}>
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
            }}
          >
            Customers List
          </h1>
          <ul>
            {customers.map((customers) => {
              return (
                <div
                  onClick={goToChatPage(customers._id)}
                  key={customers._id}
                  style={{
                    // fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    color: customers?.name ? 'black' : 'gray',
                    margin: '10px',
                    padding: '10px',
                    backgroundColor: 'lightgray',
                    borderRadius: '4px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  }}
                >
                  <p>Name: {customers?.name || 'anonymous'}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
});
export default BlastInformation;
