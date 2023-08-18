import React, { useState, useEffect } from 'react';

import {
  Tab,
  Tabs,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Title } from './style.js';

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
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TransactionModal = ({ open, onClose, opportunity }: ITransactionModalProps) => {
  const [value, setValue] = useState(0);
  const [deskLogData, setDeskLogData] = useState([]);

  useEffect(() => {
    if (open) {
      fetch('http://localhost:3434/api/desklogs')
        .then((response) => response.json())
        .then((data) => {
          setDeskLogData(data.items); // Assuming 'items' is the array of data in the API response
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: 'flex' }}>
          <Box style={{ marginTop: '20px', width: '50%' }}>
            <Title>Customer</Title>
            <div>
              <b>Customer Name:</b> {opportunity?.customer?.name}
            </div>
            <div>
              <b>Address:</b> {opportunity?.customer?.address}
            </div>
            <div>
              <b>Home Number:</b> {opportunity?.customer?.homeNumber}
            </div>
            <div>
              <b>Cell Number:</b> {opportunity?.customer?.cellNumber}
            </div>
            <div>
              <b>Work Number:</b> {opportunity?.customer?.workNumber}
            </div>
            <div>
              <b>Preferred Email:</b> {opportunity?.customer?.email}
            </div>
            <div>
              <b>Other Email:</b> {opportunity?.customer?.otherEmail}
            </div>
            <div>
              <b>Birthday:</b> {new Date(opportunity?.customer?.dateOfBirth).toDateString()}
            </div>
            <div>
              <b>Last Modified:</b> {new Date(opportunity?.customer?.updatedAt).toLocaleString()}
            </div>
            <div>{/* <b>Text Preferred:</b> {customer?.textPreferred ? 'Yes' : 'No'} */}</div>
          </Box>

          <Box style={{ marginTop: '20px', marginRight: '10px', width: '50%' }}>
            <Title>Opportunity</Title>
            <div>
              <b>Vehicle:</b> {opportunity?.customer?.vehicle}
            </div>
            <div>
              <b>Stock Number:</b> {opportunity?.customer?.stock}
            </div>
            <div>
              <b>Trade:</b> {opportunity?.trade ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Sales Team:</b> {opportunity?.customer?.salesTeam}
            </div>
            <div>
              <b>Up Type:</b> {opportunity?.customer?.upType}
            </div>
            <div>
              <b>Source:</b> {opportunity?.customer?.source}
            </div>
            <div>
              <b>Date/Time Due:</b> {new Date(opportunity?.customer.dateTimeDue).toLocaleString()}
            </div>
            <div>
              <b>Sales Status:</b> {'opportunity.salesStatus'}
            </div>
            <div>
              <b>In Showroom:</b> {opportunity?.inShowroom ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Demo:</b> {opportunity?.demo ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Ask Money Down:</b> {opportunity?.askMoneyDown ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Write Up:</b> {opportunity?.writeUp ? 'Yes' : 'No'}
            </div>
            <div>
              <b>TO:</b> {opportunity?.to ? 'Yes' : 'No'}
            </div>
            <div>
              <b>Manager Phone Call:</b> {opportunity?.managerPhoneCall ? 'Yes' : 'No'}
            </div>
          </Box>
        </div>
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
                    {/* Here you can map through your contacts and return a row for each one */}
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john.doe@example.com</TableCell>
                      <TableCell>123-456-7890</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane.smith@example.com</TableCell>
                      <TableCell>098-765-4321</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
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
                    <TableRow>
                      <TableCell>Oil Change</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>2023-07-31</TableCell>
                      <TableCell>John Doe</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tire Rotation</TableCell>
                      <TableCell>Completed</TableCell>
                      <TableCell>2023-07-30</TableCell>
                      <TableCell>Jane Smith</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <List>
                {/* Here you can map through your contacts and return a ListItem for each one */}
                <ListItem>
                  <ListItemText primary="John Doe" secondary="Referred by: Jane Smith" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Alice Johnson" secondary="Referred by: John Doe" />
                </ListItem>
                {/* Add more items as needed */}
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
