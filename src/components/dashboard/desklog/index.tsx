import React from 'react';
import './styles.css';
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const deskLogData = [
  {
    id: 1,
    customerName: 'John Doe',
    vehicle: 'Toyota Camry',
    saleStatus: 'Initial Inquiry',
    tradeIn: 'Honda Accord',
    financing: 'Pending',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    vehicle: 'Honda Civic',
    saleStatus: 'Test Drive',
    tradeIn: 'None',
    financing: 'Approved',
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    vehicle: 'Ford Mustang',
    saleStatus: 'Negotiation',
    tradeIn: 'Ford Explorer',
    financing: 'Pending',
  },
  {
    id: 4,
    customerName: 'Alice Williams',
    vehicle: 'BMW X5',
    saleStatus: 'Offer Made',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 5,
    customerName: 'Charlie Brown',
    vehicle: 'Audi Q5',
    saleStatus: 'Offer Accepted',
    tradeIn: 'Volkswagen Golf',
    financing: 'Pending',
  },
  {
    id: 6,
    customerName: 'Emily Davis',
    vehicle: 'Mercedes Benz GLE',
    saleStatus: 'Paperwork',
    tradeIn: 'None',
    financing: 'Approved',
  },
  {
    id: 7,
    customerName: 'George Miller',
    vehicle: 'Lexus RX',
    saleStatus: 'Paperwork',
    tradeIn: 'Toyota Highlander',
    financing: 'Denied',
  },
  {
    id: 8,
    customerName: 'Olivia Wilson',
    vehicle: 'Subaru Forester',
    saleStatus: 'Closed Sale',
    tradeIn: 'None',
    financing: 'Approved',
  },
  {
    id: 9,
    customerName: 'David Thomas',
    vehicle: 'Hyundai Sonata',
    saleStatus: 'Closed Sale',
    tradeIn: 'Hyundai Elantra',
    financing: 'Approved',
  },
  {
    id: 10,
    customerName: 'Sophia Anderson',
    vehicle: 'Volkswagen Tiguan',
    saleStatus: 'Test Drive',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 11,
    customerName: 'Jack Thompson',
    vehicle: 'Nissan Altima',
    saleStatus: 'Negotiation',
    tradeIn: 'Nissan Sentra',
    financing: 'Pending',
  },
  {
    id: 12,
    customerName: 'Ella Martinez',
    vehicle: 'Jeep Wrangler',
    saleStatus: 'Initial Inquiry',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 13,
    customerName: 'Harry Rodriguez',
    vehicle: 'Chevrolet Equinox',
    saleStatus: 'Test Drive',
    tradeIn: 'Chevrolet Malibu',
    financing: 'Approved',
  },
  {
    id: 14,
    customerName: 'Grace Hernandez',
    vehicle: 'GMC Yukon',
    saleStatus: 'Offer Made',
    tradeIn: 'None',
    financing: 'Denied',
  },
  {
    id: 15,
    customerName: 'James Moore',
    vehicle: 'Cadillac Escalade',
    saleStatus: 'Offer Accepted',
    tradeIn: 'Cadillac CTS',
    financing: 'Approved',
  },
  {
    id: 16,
    customerName: 'Lucy White',
    vehicle: 'Dodge Ram',
    saleStatus: 'Paperwork',
    tradeIn: 'Dodge Charger',
    financing: 'Pending',
  },
  {
    id: 17,
    customerName: 'William Jackson',
    vehicle: 'Ford Explorer',
    saleStatus: 'Closed Sale',
    tradeIn: 'Ford Fusion',
    financing: 'Approved',
  },
  {
    id: 18,
    customerName: 'Amelia Taylor',
    vehicle: 'Tesla Model 3',
    saleStatus: 'Initial Inquiry',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 19,
    customerName: 'Joshua Harris',
    vehicle: 'Chevrolet Bolt',
    saleStatus: 'Test Drive',
    tradeIn: 'Chevrolet Volt',
    financing: 'Pending',
  },
  {
    id: 20,
    customerName: 'Lily Clark',
    vehicle: 'Nissan Leaf',
    saleStatus: 'Negotiation',
    tradeIn: 'Nissan Maxima',
    financing: 'Pending',
  },
  {
    id: 21,
    customerName: 'Benjamin Lewis',
    vehicle: 'Toyota Prius',
    saleStatus: 'Offer Made',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 22,
    customerName: 'Eva Young',
    vehicle: 'Subaru Outback',
    saleStatus: 'Offer Accepted',
    tradeIn: 'Subaru Impreza',
    financing: 'Approved',
  },
  {
    id: 23,
    customerName: 'Noah Hall',
    vehicle: 'Hyundai Santa Fe',
    saleStatus: 'Paperwork',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 24,
    customerName: 'Liam Turner',
    vehicle: 'Kia Soul',
    saleStatus: 'Closed Sale',
    tradeIn: 'Kia Optima',
    financing: 'Approved',
  },
  {
    id: 25,
    customerName: 'Sophie Phillips',
    vehicle: 'Jeep Cherokee',
    saleStatus: 'Initial Inquiry',
    tradeIn: 'None',
    financing: 'Pending',
  },
  {
    id: 26,
    customerName: 'Freddie Campbell',
    vehicle: 'BMW 3 Series',
    saleStatus: 'Test Drive',
    tradeIn: 'BMW 1 Series',
    financing: 'Pending',
  },
  {
    id: 27,
    customerName: 'Poppy Parker',
    vehicle: 'Audi A4',
    saleStatus: 'Negotiation',
    tradeIn: 'Audi A1',
    financing: 'Approved',
  },
  {
    id: 28,
    customerName: 'Zachary Evans',
    vehicle: 'Mercedes Benz E Class',
    saleStatus: 'Offer Made',
    tradeIn: 'None',
    financing: 'Denied',
  },
  {
    id: 29,
    customerName: 'Rosie Edwards',
    vehicle: 'Lexus IS',
    saleStatus: 'Offer Accepted',
    tradeIn: 'Lexus CT',
    financing: 'Pending',
  },
  {
    id: 30,
    customerName: 'Tommy Baker',
    vehicle: 'Volkswagen Passat',
    saleStatus: 'Paperwork',
    tradeIn: 'Volkswagen Jetta',
    financing: 'Approved',
  },
];

const DeskLog = () => {
  return (
    <Card className={`marginBottom`}>
      <Typography variant="h5">Desk Log</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 600, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Vehicle Interested</TableCell>
              <TableCell>Sale Status</TableCell>
              <TableCell>Trade-In</TableCell>
              <TableCell>Financing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deskLogData.map((log) => (
              <TableRow
                key={log.id}
                className={`saleStatus-${log.saleStatus.replace(/\s+/g, '-')}`}
              >
                <TableCell>{log.customerName}</TableCell>
                <TableCell>{log.vehicle}</TableCell>
                <TableCell>{log.saleStatus}</TableCell>
                <TableCell>{log.tradeIn}</TableCell>
                <TableCell>{log.financing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DeskLog;
