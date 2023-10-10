import {
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  Loader,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import React from 'react';
import ChatConversations from './chatConversation.js';
import { Container, ShowButton, StyledHeading } from './customers.style.js';

function CustomersList() {
  const api = new ApiClient();
  const [limit] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [apiURI, setApiURI] = React.useState('');
  const [customers, setCustomers] = React.useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
  const [showConversation, setShowConversation] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiURI}/customers?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        if (data?.items?.length) {
          setCustomers(data.items);
        }
        if (data?.total) {
          setTotal(data.total);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    })();
  }, [apiURI, limit, offset]);

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowConversation(true);
  };

  const handleBackToCustomerList = () => {
    setSelectedCustomerId(null);
    setShowConversation(false);
  };

  const handleSetPagination = React.useCallback(
    (value) => {
      console.log('value', value);
      setOffset((value - 1) * limit);
      setPage(value);
    },
    [offset, limit, apiURI],
  );

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
      <Table>
        <TableCaption>{'Customers matched filter'}</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Conversation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            customers?.map((customer) => (
              <TableRow key={customer?._id}>
                <TableCell>{customer?.email}</TableCell>
                <TableCell>{customer?.name}</TableCell>
                <TableCell>{customer?._id}</TableCell>
                <TableCell>{customer?.age}</TableCell>
                <TableCell>
                  <ShowButton onClick={() => handleCustomerClick(customer._id)}>Chat</ShowButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && <Loader />}
      <div style={{ margin: '20px auto', width: 'fit-content' }}>
        <Pagination onChange={handleSetPagination} total={total} perPage={limit} page={page} />
      </div>
    </Container>
  );
}

export default CustomersList;
