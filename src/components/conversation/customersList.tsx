import React from 'react';
import ChatConversations from './chatConversation.js';
import {
  Container,
  ShowButton,
  StyledHeading,
  StyledTable,
  TableCell,
  TableHeader,
  TableRow,
} from './customers.style.js';
import { ApiClient } from 'adminjs';

function CustomersList() {
  const api = new ApiClient();
  const [apiURI, setApiURI] = React.useState('');
  const [customers, setCustomers] = React.useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
  const [showConversation, setShowConversation] = React.useState(false);

  React.useEffect(() => {
    const fetchServerSide = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'chat',
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
    if (!apiURI) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURI}/customers`);
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
  }, [apiURI]);

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
      <ChatConversations
        customerId={selectedCustomerId}
        onBackClick={handleBackToCustomerList}
        titleBack="Back To Customers"
      />
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
