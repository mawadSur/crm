import React, { useEffect, useState } from 'react';

const CustomerList = ({ onDataUpdate, selectedSection }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const fetchUrl =
    process.env.USE_LOCAL === 'true'
      ? `${process.env.FETCH_URL}/api/customers`
      : 'http://localhost:3434/api/customers/customer-followup';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const totalCustomers = customers.length;
    const positiveResponseCount = customers.filter(
      (customer) => customer.flags[0].isBuying === true,
    ).length;
    const madeAppointmentCount = customers.filter(
      (customer) => customer.flags[0].didMakeAppointment === true,
    ).length;
    const visitedStoreCount = customers.filter(
      (customer) => customer.flags[0].didVisitStore === true,
    ).length;
    const purchaseCount = customers.filter(
      (customer) => customer.flags[0].didPurchase === true,
    ).length;

    onDataUpdate({
      totalCustomers,
      positiveResponseCount,
      madeAppointmentCount,
      visitedStoreCount,
      purchaseCount,
    });
  }, [fetchUrl, customers]);

  useEffect(() => {
    const selectedCustomers = customers.filter((customer) => {
      if (selectedSection === 'Sent message') {
        return true;
      } else if (selectedSection === 'Positive Response') {
        return customer.flags[0].isBuying === true;
      } else if (selectedSection === 'Made Appointment') {
        return customer.flags[0].didMakeAppointment === true;
      } else if (selectedSection === 'Visited Store') {
        return customer.flags[0].didVisitStore === true;
      } else if (selectedSection === 'Purchased') {
        return customer.flags[0].didPurchase === true;
      }
      return false;
    });
    setFilteredCustomers(selectedCustomers);
  }, [selectedSection, customers]);

  return (
    <div>
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          borderBottom: '1px solid #ccc',
          paddingBottom: '10px', //
        }}
      >
        Customers List :{' '}
      </h1>
      <ul>
        {filteredCustomers.map((customer) => {
          return (
            <div
              key={customer._id}
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                color: customer.name ? 'black' : 'gray',
                margin: '10px',
                padding: '10px',
                backgroundColor: 'lightgray',
                borderRadius: '4px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
            >
              <p>Name: {customer.name || 'anonymous'}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomerList;
