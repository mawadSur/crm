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
import {
  getConversationByCustomerId,
  getCustomerActivities,
  getCustomerInsurances,
  getCustomerServices,
  getCustomerVehicles,
} from '../../libs/apis/index.js';
import { dateFormat, formatPhoneNumber, formatPrice } from '../../utils/index.js';
import { Text, TextAlert, Title } from './style.js';

export interface ITransactionModalProps {
  open: boolean;
  onClose: () => void;
  opportunity: any;
  apiURI: string;
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

const TransactionModal = ({ open, onClose, opportunity, apiURI }: ITransactionModalProps) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [customer, setCustomer] = React.useState({});
  const [customerServices, setCustomerServices] = React.useState([]);
  const [customerInsurances, setCustomerInsurances] = React.useState([]);
  const [customerVehicles, setCustomerVehicles] = React.useState([]);
  const [customerActivities, setCustomerActivities] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!opportunity?.customerId) return;

    setLoading(true);

    // Use an async function to fetch the conversation
    const fetching = async () => {
      const [
        responseConversation,
        responseCustomerService,
        responseInsurance,
        responseVehicle,
        responseActivity,
      ] = await Promise.allSettled([
        getConversationByCustomerId(opportunity.customerId, apiURI),
        getCustomerServices(opportunity.customerId, apiURI),
        getCustomerInsurances(opportunity.customerId, apiURI),
        getCustomerVehicles(opportunity.customerId, apiURI),
        getCustomerActivities(opportunity.customerId, apiURI),
      ]);

      if (responseConversation.status === 'fulfilled' && responseConversation.value?.length > 0) {
        setCustomer(responseConversation.value);
      }

      if (
        responseCustomerService.status === 'fulfilled' &&
        responseCustomerService.value?.data?.length > 0
      ) {
        setCustomerServices(responseCustomerService.value.data);
      }

      if (responseInsurance.status === 'fulfilled' && responseInsurance.value?.data?.length > 0) {
        setCustomerInsurances(responseInsurance.value.data);
      }

      if (responseVehicle.status === 'fulfilled' && responseVehicle.value?.data?.length > 0) {
        setCustomerVehicles(responseVehicle.value.data);
      }

      if (responseActivity.status === 'fulfilled' && responseActivity.value?.data?.length > 0) {
        setCustomerActivities(responseActivity.value.data);
      }

      setLoading(false);
    };

    fetching();
  }, [opportunity?.customerId]);

  const otherContracts = opportunity?.customer?.otherContacts ?? [];
  const relationships = opportunity?.customer?.relationships ?? [];

  const handleButtonClick = () => {
    const { _id } = opportunity;
    const urlWithQuery = `./admin/pages/calculator?id=${_id}`;
    window.location.href = urlWithQuery;
  };

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
          <Box>
            <button
              onClick={handleButtonClick}
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginTop: '20px',
                marginLeft: '10px',
                borderRadius: 6,
                padding: 6,
                cursor: 'pointer',
              }}
            >
              Go to calculator
            </button>
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
                    {otherContracts.map((contact) => {
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
                {otherContracts?.length === 0 && <TextAlert>There are no contacts added</TextAlert>}
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
                    {customerServices?.map((service) => {
                      return (
                        <TableRow id={service._id}>
                          <TableCell>{service?.serviceTypeId?.name ?? 'N/A'}</TableCell>
                          <TableCell>{service.status ?? 'N/A'}</TableCell>
                          <TableCell>{dateFormat(service.createdAt)}</TableCell>
                          <TableCell>{service?.customerId?.name ?? 'N/A'}</TableCell>
                        </TableRow>
                      );
                    })}

                    {/* Add more rows as needed */}
                  </TableBody>
                  {customerServices?.length === 0 && (
                    <TextAlert>There is no Service History</TextAlert>
                  )}
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <List>
                {relationships?.map((rel) => {
                  return (
                    <ListItem>
                      <ListItemText
                        primary={rel.name}
                        secondary={`Referred by: ${opportunity.customer?.name}`}
                      />
                    </ListItem>
                  );
                })}

                {relationships?.length === 0 && <TextAlert>There are no Relationships</TextAlert>}
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
                    {customerInsurances.map((insurance) => {
                      return (
                        <TableRow key={insurance._id}>
                          <TableCell>{insurance?.policyType ?? 'N/A'}</TableCell>
                          <TableCell>{insurance?.policyNumber ?? 'N/A'}</TableCell>
                          <TableCell>{dateFormat(insurance.expiryDate)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  {customerInsurances?.length === 0 && <TextAlert>No insurance uploaded</TextAlert>}
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
                      <TableCell>Equity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerVehicles?.map((vehicle) => {
                      return (
                        <TableRow key={vehicle._id}>
                          <TableCell>{vehicle?.customerId?.name ?? 'N/A'}</TableCell>
                          <TableCell>{vehicle?.make ?? 'N/A'}</TableCell>
                          <TableCell>{vehicle?.model ?? 'N/A'}</TableCell>
                          <TableCell>{vehicle?.year ?? 'N/A'}</TableCell>
                          <TableCell>{formatPrice(vehicle?.equity) ?? 'N/A'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  {customerVehicles?.length === 0 && (
                    <TextAlert>There are no records of Vehicles</TextAlert>
                  )}
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <List>
                {customerActivities?.map((activity) => {
                  return (
                    <ListItem key={activity._id}>
                      <ListItemText
                        primary={`${activity?.customerId?.name} ${activity?.activityId?.name}`}
                        secondary={dateFormat(activity?.createdAt, true)}
                      />
                    </ListItem>
                  );
                })}
              </List>
              {customerActivities?.length === 0 && (
                <TextAlert>There are no logs recorded</TextAlert>
              )}
            </TabPanel>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
