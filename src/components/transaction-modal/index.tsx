import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { getConversationByCustomerId, getCustomerServices } from '../../libs/apis/index.js';
import { dateFormat, formatPhoneNumber } from '../../utils/index.js';
import { Text, Title } from './style.js';

export interface ITransactionModalProps {
  open: boolean;
  onClose: () => void;
  opportunity: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Text role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Text>
  );
}

const TransactionModal = ({ open, onClose, opportunity }: ITransactionModalProps) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [customer, setCustomer] = React.useState({});
  const [customerService, setCustomerService] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!opportunity?.customerId) return;

    setLoading(true);

    // Use an async function to fetch the conversation
    const fetching = async () => {
      const conversation = await getConversationByCustomerId(opportunity.customerId);

      const [responseConversation, responseCustomerService] = await Promise.all([
        getConversationByCustomerId(opportunity.customerId),
        getCustomerServices(opportunity.customerId),
      ]);

      if (responseConversation?.length > 0) {
        setCustomer(conversation);
      }

      if (responseCustomerService?.data?.length > 0) {
        setCustomerService(responseCustomerService.data);
      }

      setLoading(false);
    };

    fetching();
  }, [opportunity?.customerId]);

  console.log('opportunity', opportunity);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Text style={{ display: 'flex' }}>
          <Box style={{ marginTop: '20px', width: '50%' }}>
            <Title>Customer</Title>
            <Text>
              <b>Customer Name:</b> {opportunity?.customer?.name ?? 'N/A'}
            </Text>
            <Text>
              <b>Address:</b> {opportunity?.customer?.address ?? 'N/A'}
            </Text>
            <Text>
              <b>Home Number:</b> {formatPhoneNumber(opportunity?.customer?.homeNumber) ?? 'N/A'}
            </Text>
            <Text>
              <b>Cell Number:</b> {formatPhoneNumber(opportunity?.customer?.cellNumber) ?? 'N/A'}
            </Text>
            <Text>
              <b>Work Number:</b> {formatPhoneNumber(opportunity?.customer?.workNumber) ?? 'N/A'}
            </Text>
            <Text>
              <b>Preferred Email:</b> {opportunity?.customer?.preferredContactMethod ?? 'N/A'}
            </Text>
            <Text>
              <b>Other Email:</b> {opportunity?.customer?.email ?? 'N/A'}
            </Text>
            <Text>
              <b>Birthday:</b>{' '}
              {opportunity?.customer?.dateOfBirth
                ? dayjs(opportunity.customer.dateOfBirth).format('YYYY-MM-DD')
                : 'N/A'}
            </Text>
            <Text>
              <b>Last Modified:</b>{' '}
              {opportunity?.customer?.updatedAt
                ? dateFormat(opportunity.customer.updatedAt, true)
                : 'N/A'}
            </Text>
          </Box>

          <Box style={{ marginTop: '20px', marginRight: '10px', width: '50%' }}>
            <Title>Opportunity</Title>
            <Text>
              <b>Vehicle:</b> {opportunity?.vehicle?.model ?? ''} {opportunity?.vehicle?.make ?? ''}
            </Text>
            <Text>
              <b>Stock Number:</b> 10
            </Text>
            <Text>
              <b>Trade:</b> {opportunity?.trade ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>Sales Team:</b> {opportunity?.salesRep?.name ?? ''}
            </Text>
            {/* <Text>
              <b>Up Type:</b> {'opportunity.upType'}
            </Text> */}
            <Text>
              <b>Source:</b> {opportunity?.referralSource ?? 'N/A'}
            </Text>
            <Text>
              <b>Date/Time Due:</b> {dateFormat(new Date().toISOString())}
            </Text>
            <Text>
              <b>Sales Status:</b> {opportunity?.saleStatus ?? 'N/A'}
            </Text>
            <Text>
              <b>In Showroom:</b> {opportunity?.inShowroom ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>Demo:</b> {opportunity?.demo ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>Ask Money Down:</b> {opportunity?.askMoneyDown ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>Write Up:</b> {opportunity?.writeUp ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>TO:</b> {opportunity?.to ? 'Yes' : 'No'}
            </Text>
            <Text>
              <b>Manager Phone Call:</b> {opportunity?.managerPhoneCall ? 'Yes' : 'No'}
            </Text>
          </Box>
        </Text>
        <>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Contacts" />
                <Tab label="Service" />
                <Tab label="Relationships" />
                <Tab label="Ins/Other" />
                <Tab label="Lifetime Value" />
                <Tab label="Vehicles" />
                <Tab label="Audit Trail" />
                <Tab label="Equity" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {opportunity?.customer?.otherContacts?.map((contact) => {
                      return (
                        <TableRow key={contact._id}>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{formatPhoneNumber(contact.phone)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Here you can map through your service requests and return a row for each one */}
                    {customerService?.map((service) => {
                      return (
                        <TableRow id={service._id}>
                          <TableCell>{service?.name ?? 'N/A'}</TableCell>
                          <TableCell>{service.status ?? 'N/A'}</TableCell>
                          <TableCell>{dateFormat(service.createdAt)}</TableCell>
                          <TableCell>{service?.customer?.name ?? 'N/A'}</TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <List>
                {opportunity?.customer?.relationships?.map((rel) => {
                  return (
                    <ListItem>
                      <ListItemText
                        primary={rel.name}
                        secondary={`Referred by: ${opportunity.customer?.name}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Policy Type</TableCell>
                      <TableCell>Policy Number</TableCell>
                      <TableCell>Expiry Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Here you can map through your insurance policies and return a row for each one */}
                    <TableRow>
                      <TableCell>Car Insurance</TableCell>
                      <TableCell>12345</TableCell>
                      <TableCell>2024-01-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Health Insurance</TableCell>
                      <TableCell>67890</TableCell>
                      <TableCell>2023-12-31</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <List>
                {/* Here you can map through your contacts and return a ListItem for each one */}
                <ListItem>
                  <ListItemText primary="John Doe" secondary="Lifetime Value: $5000" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Jane Smith" secondary="Lifetime Value: $6000" />
                </ListItem>
                {/* Add more items as needed */}
              </List>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Owner</TableCell>
                      <TableCell>Make</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Here you can map through your vehicles and return a row for each one */}
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Ford</TableCell>
                      <TableCell>Mustang</TableCell>
                      <TableCell>2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Toyota</TableCell>
                      <TableCell>Corolla</TableCell>
                      <TableCell>2022</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <List>
                {/* Here you can map through your audit trail entries and return a ListItem for each one */}
                <ListItem>
                  <ListItemText
                    primary="John Doe updated contact details"
                    secondary="2023-07-31 10:30 AM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Jane Smith made a purchase"
                    secondary="2023-07-30 2:45 PM"
                  />
                </ListItem>
                {/* Add more items as needed */}
              </List>
            </TabPanel>
            <TabPanel value={value} index={7}>
              <List>
                {/* Here you can map through your contacts and return a ListItem for each one */}
                <ListItem>
                  <ListItemText primary="John Doe" secondary="Equity: $5000" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Jane Smith" secondary="Equity: $10000" />
                </ListItem>
                {/* Add more items as needed */}
              </List>
            </TabPanel>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
