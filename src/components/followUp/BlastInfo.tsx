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
      { value: 0, name: EChartKeys.SentMessage },
      { value: 0, name: EChartKeys.PositiveResponse },
      { value: 0, name: EChartKeys.MadeAppointment },
      { value: 0, name: EChartKeys.VisitedStore },
      { value: 0, name: EChartKeys.Purchased },
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

    //! Count data in chart
    const tmpDataChart = [...data];
    const indexOfSentCount = tmpDataChart.findIndex((item) => item.name === EChartKeys.SentMessage);
    const indexOfMakeAppointment = tmpDataChart.findIndex(
      (item) => item.name === EChartKeys.MadeAppointment,
    );
    const indexOfVisitStore = tmpDataChart.findIndex(
      (item) => item.name === EChartKeys.VisitedStore,
    );
    const indexOfPurchase = tmpDataChart.findIndex((item) => item.name === EChartKeys.Purchased);

    const customerMakeAppointmentCount =
      customers.filter((item) => item?.flags?.didMakeAppointment)?.length || 0;

    const customerVisitedStoreCount =
      customers.filter((item) => item?.flags?.didVisitStore)?.length || 0;

    const customerPurchasedCount =
      customers.filter((item) => item?.flags?.didPurchase)?.length || 0;

    tmpDataChart[indexOfSentCount].value = customers.length;
    tmpDataChart[indexOfMakeAppointment].value = customerMakeAppointmentCount;
    tmpDataChart[indexOfVisitStore].value = customerVisitedStoreCount;
    tmpDataChart[indexOfPurchase].value = customerPurchasedCount;

    console.log('tmpDataChart', tmpDataChart);
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
