import React, { useState, useEffect } from 'react';
import {
  Container,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  StyledHeading,
  ShowButton,
} from './customers.style.js';
import ChatConversations from './chatConversation.js';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showConversation, setShowConversation] = useState(false);

  //'http://localhost:3434/api/customers'
  //`${process.env.FETCH_URL}/api/customers`

  const fetchUrl =
    process.env.USE_LOCAL === 'true'
      ? `${process.env.FETCH_URL}/api/customers`
      : 'http://localhost:3434/api/customers';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowConversation(true);
  };

  const handleBackToCustomerList = () => {
    setSelectedCustomerId(null);
    setShowConversation(false);
  };

  if (showConversation) {
    return (
      <ChatConversations customerId={selectedCustomerId} onBackClick={handleBackToCustomerList} />
    );
  }

  return (
    <Container>
      <StyledHeading>Customer List</StyledHeading>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Email</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Conversation</TableHeader>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer._id}</TableCell>
              <TableCell>{customer.age}</TableCell>
              <TableCell>
                <ShowButton onClick={() => handleCustomerClick(customer._id)}>Chat</ShowButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

export default CustomersList;
