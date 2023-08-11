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
import styled from 'styled-components';

import ChatConversations from './chatConversation.js';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showConversation, setShowConversation] = useState(false);

  const fetchUrl =
    process.env.USE_LOCAL === 'true'
      ? `${process.env.FETCH_URL}/customers/getCustomers`
      : '/customers/getCustomers';

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', JSON.stringify(data, null, 2));
        setCustomers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowConversation(true); // Show the conversation page
  };

  const handleBackToCustomerList = () => {
    setShowConversation(false); // Show the customer list page
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
            <TableHeader>Conversation </TableHeader>
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
