import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Pagination, Skeleton } from '@mui/material';
import dayjs from 'dayjs';
import { Appointment } from '../../../models/index.js';
import { Card, Title } from '../../common/index.js';

const AppointmentsToday = React.memo(() => {
  const [appointments, setAppointments] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [limit, _] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:3434/api/appointments' + '?offset=' + offset + '&limit=' + limit
        );
        console.log('response', response);
        const data = await response.json();
        if (data?.items?.length) {
          setAppointments(data.items);
        }
        if (data?.total) {
          setTotal(data.total);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [offset, limit]);

  const handleSetPagination = React.useCallback(
    (_, value) => {
      setOffset((value - 1) * limit);
    },
    [offset, limit]
  );

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
            {loading && (
              <React.Fragment>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
                <TableCell>
                  <Skeleton animation="wave" />
                </TableCell>
              </React.Fragment>
            )}
            {!loading &&
              appointments?.length > 0 &&
              appointments.map((appointment: Appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell scope="row">{dayjs(appointment.time).format('h:mm A')}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment?.car?.model ?? ''}</TableCell>
                  <TableCell>{appointment?.car?.VIN ?? ''}</TableCell>
                  <TableCell>{appointment.isNew ? 'New' : 'Used'}</TableCell>
                  <TableCell>{appointment?.salesRep?.name ?? ''}</TableCell>
                </TableRow>
              ))}
            {!loading && appointments?.length === 0 && <TableRow>{'Empty Appointments'}</TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        style={{ margin: '0 auto', width: 'fit-content', marginTop: '0.5rem' }}
        count={Math.round(total / limit)}
        variant="outlined"
        shape="rounded"
        color="primary"
        onChange={handleSetPagination}
      />
    </Card>
  );
});

export default AppointmentsToday;
