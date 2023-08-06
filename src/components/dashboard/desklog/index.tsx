import {
  Card,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { Title } from '../../common/index.js';
import TransactionModal from '../../../components/transaction-modal/index.js';

// Sample data with additional fields
const deskLogData = [
  {
    id: 1,
    customerName: 'John Doe',
    vehicle: 'Toyota Camry',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '9:00 AM',
    timeOut: '5:00 PM',
    referralSource: 'Internet',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Interested in the latest model.',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    vehicle: 'Honda Civic',
    saleStatus: 'Completed',
    tradeIn: '2009 Ford Focus',
    financing: 'Approved',
    timeIn: '10:30 AM',
    timeOut: '6:30 PM',
    referralSource: 'Phone',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    vehicle: 'Ford Mustang',
    saleStatus: 'Lost',
    tradeIn: '2015 Chevrolet Corvette',
    financing: 'Declined',
    timeIn: '11:15 AM',
    timeOut: '4:45 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 4,
    customerName: 'Alice Williams',
    vehicle: 'BMW X5',
    saleStatus: 'In Progress',
    tradeIn: '2018 Audi Q7',
    financing: 'Pending',
    timeIn: '2:00 PM',
    timeOut: '7:30 PM',
    referralSource: 'Internet',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs time to decide.',
  },
  {
    id: 5,
    customerName: 'Charlie Brown',
    vehicle: 'Audi Q5',
    saleStatus: 'Completed',
    tradeIn: '2014 BMW 3 Series',
    financing: 'Approved',
    timeIn: '12:45 PM',
    timeOut: '6:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the test drive.',
  },
  {
    id: 26,
    customerName: 'Olivia Wilson',
    vehicle: 'Nissan Rogue',
    saleStatus: 'In Progress',
    tradeIn: '2016 Honda CR-V',
    financing: 'Pending',
    timeIn: '9:30 AM',
    timeOut: '4:30 PM',
    referralSource: 'Internet',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 27,
    customerName: 'Lucas Lee',
    vehicle: 'Kia Seltos',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '10:00 AM',
    timeOut: '6:00 PM',
    referralSource: 'Campaign',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Interested in the latest model.',
  },
  {
    id: 28,
    customerName: 'Ava Robinson',
    vehicle: 'Hyundai Sonata',
    saleStatus: 'In Progress',
    tradeIn: '2012 Toyota Corolla',
    financing: 'Pending',
    timeIn: '11:30 AM',
    timeOut: '5:30 PM',
    referralSource: 'Phone',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Wants to compare prices.',
  },
  {
    id: 29,
    customerName: 'Emma Hall',
    vehicle: 'Chevrolet Equinox',
    saleStatus: 'Completed',
    tradeIn: '2010 Ford Escape',
    financing: 'Approved',
    timeIn: '1:00 PM',
    timeOut: '7:00 PM',
    referralSource: 'Internet',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Excited about the deal.',
  },
  {
    id: 30,
    customerName: 'William Baker',
    vehicle: 'Volkswagen Tiguan',
    saleStatus: 'Lost',
    tradeIn: 'None',
    financing: 'Declined',
    timeIn: '3:30 PM',
    timeOut: '8:30 PM',
    referralSource: 'Service',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Considering other options.',
  },
  {
    id: 31,
    customerName: 'Sophia Lee',
    vehicle: 'Mazda CX-5',
    saleStatus: 'In Progress',
    tradeIn: '2014 Hyundai Santa Fe',
    financing: 'Pending',
    timeIn: '9:45 AM',
    timeOut: '5:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 32,
    customerName: 'Oliver Davis',
    vehicle: 'Subaru Outback',
    saleStatus: 'Completed',
    tradeIn: '2013 Toyota RAV4',
    financing: 'Approved',
    timeIn: '10:15 AM',
    timeOut: '6:45 PM',
    referralSource: 'Internet',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 33,
    customerName: 'Aria Scott',
    vehicle: 'Jeep Grand Cherokee',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '11:45 AM',
    timeOut: '4:15 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 34,
    customerName: 'Ethan Turner',
    vehicle: 'Ford Explorer',
    saleStatus: 'In Progress',
    tradeIn: '2017 Chevrolet Traverse',
    financing: 'Pending',
    timeIn: '12:30 PM',
    timeOut: '5:30 PM',
    referralSource: 'Service',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs to discuss with family.',
  },
  {
    id: 35,
    customerName: 'Amelia Martin',
    vehicle: 'Kia Telluride',
    saleStatus: 'Completed',
    tradeIn: '2016 Nissan Pathfinder',
    financing: 'Approved',
    timeIn: '2:15 PM',
    timeOut: '7:45 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the features.',
  },

  {
    id: 31,
    customerName: 'Sophia Lee',
    vehicle: 'Mazda CX-5',
    saleStatus: 'In Progress',
    tradeIn: '2014 Hyundai Santa Fe',
    financing: 'Pending',
    timeIn: '9:45 AM',
    timeOut: '5:15 PM',
    referralSource: 'Phone',
    salesRep: 'Sarah Johnson',
    phoneNumberHome: '123-456-7890',
    phoneNumberCell: '987-654-3210',
    phoneNumberWork: '567-890-1234',
    comments: 'Needs to discuss with spouse.',
  },
  {
    id: 32,
    customerName: 'Oliver Davis',
    vehicle: 'Subaru Outback',
    saleStatus: 'Completed',
    tradeIn: '2013 Toyota RAV4',
    financing: 'Approved',
    timeIn: '10:15 AM',
    timeOut: '6:45 PM',
    referralSource: 'Internet',
    salesRep: 'Michael Brown',
    phoneNumberHome: '111-222-3333',
    phoneNumberCell: '444-555-6666',
    phoneNumberWork: '777-888-9999',
    comments: 'Happy with the deal.',
  },
  {
    id: 33,
    customerName: 'Aria Scott',
    vehicle: 'Jeep Grand Cherokee',
    saleStatus: 'In Progress',
    tradeIn: 'None',
    financing: 'Pending',
    timeIn: '11:45 AM',
    timeOut: '4:15 PM',
    referralSource: 'Campaign',
    salesRep: 'David Miller',
    phoneNumberHome: '222-333-4444',
    phoneNumberCell: '555-666-7777',
    phoneNumberWork: '888-999-0000',
    comments: 'Considering other options.',
  },
  {
    id: 34,
    customerName: 'Ethan Turner',
    vehicle: 'Ford Explorer',
    saleStatus: 'In Progress',
    tradeIn: '2017 Chevrolet Traverse',
    financing: 'Pending',
    timeIn: '12:30 PM',
    timeOut: '5:30 PM',
    referralSource: 'Service',
    salesRep: 'Oliver Wilson',
    phoneNumberHome: '333-444-5555',
    phoneNumberCell: '666-777-8888',
    phoneNumberWork: '999-000-1111',
    comments: 'Needs to discuss with family.',
  },
  {
    id: 35,
    customerName: 'Amelia Martin',
    vehicle: 'Kia Telluride',
    saleStatus: 'Completed',
    tradeIn: '2016 Nissan Pathfinder',
    financing: 'Approved',
    timeIn: '2:15 PM',
    timeOut: '7:45 PM',
    referralSource: 'Phone',
    salesRep: 'Sophia Thomas',
    phoneNumberHome: '444-555-6666',
    phoneNumberCell: '777-888-9999',
    phoneNumberWork: '000-111-2222',
    comments: 'Loves the features.',
  },
];

const DeskLog = () => {
  const [openTransactionModal, setOpenTransactionModal] = React.useState(false);
  const [currentLog, setCurrentLog] = React.useState();
  const closeTransactionModal = React.useCallback(() => {
    setOpenTransactionModal(false);
  }, []);

  // Function to handle status change
  const handleStatusChange = (event, logId) => {
    // Implement your logic to update the sale status for the corresponding logId
    // For example, you can update the status in the deskLogData array
    console.log(`New status for logId ${logId}:`, event.target.value);
  };

  const handleRowClick = (log) => {
    setOpenTransactionModal(true);
    setCurrentLog(log);
    // dispatch(modalReducerJs.setTransactionId('id'));
    // dispatch(modalReducerJs.openModal()); // set modal state to true to open the modal
  };

  return (
    <React.Fragment>
      <TransactionModal
        open={openTransactionModal}
        onClose={closeTransactionModal}
        opportunity={currentLog}
      />
      <Card>
        <Title>Desk Log</Title>
        <TableContainer component={Paper} style={{ maxHeight: 600, overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Vehicle Interested</TableCell>
                <TableCell>Sale Status</TableCell>
                <TableCell>Trade-In</TableCell>
                <TableCell>Financing</TableCell>
                <TableCell>Time In</TableCell>
                <TableCell>Time Out</TableCell>
                <TableCell>Referral Source</TableCell>
                <TableCell>Sales Rep</TableCell>
                <TableCell>Phone Numbers</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deskLogData.map((log) => (
                <TableRow
                  key={log.id}
                  className={`saleStatus-${log.saleStatus.replace(/\s+/g, '-')}`}
                  onClick={() => handleRowClick(log)}
                >
                  <TableCell>{log.customerName}</TableCell>
                  <TableCell>{log.vehicle}</TableCell>
                  <TableCell>
                    {/* Dropdown to change sale status */}
                    <Select value={log.saleStatus} onChange={(e) => handleStatusChange(e, log.id)}>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Lost">Lost</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{log.tradeIn}</TableCell>
                  <TableCell>{log.financing}</TableCell>
                  <TableCell>{log.timeIn}</TableCell>
                  <TableCell>{log.timeOut}</TableCell>
                  <TableCell>{log.referralSource}</TableCell>
                  <TableCell>{log.salesRep}</TableCell>
                  <TableCell>
                    {/* Display phone numbers */}
                    <div>Home: {log.phoneNumberHome}</div>
                    <div>Cell: {log.phoneNumberCell}</div>
                    <div>Work: {log.phoneNumberWork}</div>
                  </TableCell>
                  <TableCell>{log.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </React.Fragment>
  );
};

export default DeskLog;
