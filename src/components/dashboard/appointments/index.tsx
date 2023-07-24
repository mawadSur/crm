import React from 'react';
import { Card, Title } from '../../common/index.js';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const appointments = [
  {
    id: 1,
    name: 'John Doe',
    time: '8:30 AM',
    car: 'Toyota Camry',
    vin: '1HGCM82633A123456',
    isNew: true,
    salesRep: 'Sarah Johnson',
  },
  {
    id: 2,
    name: 'Jane Smith',
    time: '9:00 AM',
    car: 'Honda Civic',
    vin: '1HGCM82633A123457',
    isNew: false,
    salesRep: 'Michael Brown',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    time: '9:30 AM',
    car: 'Ford Mustang',
    vin: '1HGCM82633A123458',
    isNew: true,
    salesRep: 'Sarah Johnson',
  },
  {
    id: 4,
    name: 'Alice Williams',
    time: '10:00 AM',
    car: 'BMW X5',
    vin: '1HGCM82633A123459',
    isNew: false,
    salesRep: 'Michael Brown',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    time: '10:30 AM',
    car: 'Audi Q5',
    vin: '1HGCM82633A123460',
    isNew: true,
    salesRep: 'David Miller',
  },
  {
    id: 6,
    name: 'Emily Davis',
    time: '11:00 AM',
    car: 'Mercedes Benz GLE',
    vin: '1HGCM82633A123461',
    isNew: false,
    salesRep: 'Emma Davis',
  },
  {
    id: 7,
    name: 'Michael Smith',
    time: '11:30 AM',
    car: 'Nissan Rogue',
    vin: '1HGCM82633A123462',
    isNew: true,
    salesRep: 'David Miller',
  },
  {
    id: 8,
    name: 'Oliver Johnson',
    time: '12:00 PM',
    car: 'Subaru Outback',
    vin: '1HGCM82633A123463',
    isNew: false,
    salesRep: 'Emma Davis',
  },
  {
    id: 9,
    name: 'Sophia Brown',
    time: '12:30 PM',
    car: 'Ford Explorer',
    vin: '1HGCM82633A123464',
    isNew: true,
    salesRep: 'Oliver Wilson',
  },
  {
    id: 10,
    name: 'Emma Wilson',
    time: '1:00 PM',
    car: 'Tesla Model 3',
    vin: '1HGCM82633A123465',
    isNew: false,
    salesRep: 'Sophia Thomas',
  },
  {
    id: 11,
    name: 'Liam Taylor',
    time: '1:30 PM',
    car: 'Hyundai Sonata',
    vin: '1HGCM82633A123466',
    isNew: true,
    salesRep: 'Oliver Wilson',
  },
  {
    id: 12,
    name: 'Noah Davis',
    time: '2:00 PM',
    car: 'Chevrolet Equinox',
    vin: '1HGCM82633A123467',
    isNew: false,
    salesRep: 'Sophia Thomas',
  },
  {
    id: 13,
    name: 'Lucas Thompson',
    time: '2:30 PM',
    car: 'Ford F-150',
    vin: '1HGCM82633A123468',
    isNew: true,
    salesRep: 'Lucas Taylor',
  },
  {
    id: 14,
    name: 'Ava White',
    time: '3:00 PM',
    car: 'Jeep Grand Cherokee',
    vin: '1HGCM82633A123469',
    isNew: false,
    salesRep: 'Ava Thompson',
  },
  {
    id: 15,
    name: 'Mia Harris',
    time: '3:30 PM',
    car: 'Chevrolet Silverado',
    vin: '1HGCM82633A123470',
    isNew: true,
    salesRep: 'Lucas Taylor',
  },
  {
    id: 16,
    name: 'Jackson Green',
    time: '4:00 PM',
    car: 'Honda CR-V',
    vin: '1HGCM82633A123471',
    isNew: false,
    salesRep: 'Ava Thompson',
  },
  {
    id: 17,
    name: 'Mason Martin',
    time: '4:30 PM',
    car: 'Tesla Model X',
    vin: '1HGCM82633A123472',
    isNew: true,
    salesRep: 'Mia White',
  },
  {
    id: 18,
    name: 'Ethan Moore',
    time: '5:00 PM',
    car: 'BMW X3',
    vin: '1HGCM82633A123473',
    isNew: false,
    salesRep: 'Jackson Harris',
  },
  {
    id: 19,
    name: 'Sophia King',
    time: '5:30 PM',
    car: 'Subaru Forester',
    vin: '1HGCM82633A123474',
    isNew: true,
    salesRep: 'Mia White',
  },
  {
    id: 20,
    name: 'Benjamin Wright',
    time: '6:00 PM',
    car: 'Mercedes Benz E-Class',
    vin: '1HGCM82633A123475',
    isNew: false,
    salesRep: 'Jackson Harris',
  },
];

const AppointmentsToday = () => {
  return (
    <Card>
      <Title>Today's Appointments</Title>
      <TableContainer component={Paper} style={{ maxHeight: 400, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Car Interested In</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>New/Used</TableCell>
              <TableCell>Sales Rep</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell component="th" scope="row">
                  {appointment.time}
                </TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.car}</TableCell>
                <TableCell>{appointment.vin}</TableCell>
                <TableCell>{appointment.isNew ? 'New' : 'Used'}</TableCell>
                <TableCell>{appointment.salesRep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default AppointmentsToday;
