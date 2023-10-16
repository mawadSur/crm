import {
  Badge,
  Loader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@adminjs/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { Card, Title } from '../../common/index.js';

const AppointmentsToday = React.memo(({ apiURI }: { apiURI: string }) => {
  const [appointments, setAppointments] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [limit, _] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!apiURI) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiURI}/appointments` + '?offset=' + offset + '&limit=' + limit,
        );
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
  }, [offset, limit, apiURI]);

  const handleSetPagination = React.useCallback(
    (value) => {
      setOffset((value - 1) * limit);
      setPage(value);
    },
    [offset, limit, apiURI],
  );

  return (
    <Card>
      <Title>Today's Appointments</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Car Interested In</TableCell>
            <TableCell>Show/No Show</TableCell>
            <TableCell>Confirmed</TableCell>
            <TableCell>New/Used</TableCell>
            <TableCell>Sales Rep</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            appointments?.length > 0 &&
            appointments.map((appointment: any) => (
              <TableRow key={appointment.id}>
                <TableCell scope="row">{dayjs(appointment.time).format('h:mm A')}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment?.car?.model ?? ''}</TableCell>
                <TableCell
                  style={{
                    color:
                      dayjs(appointment?.time).format('h:mm A') > dayjs().format('h:mm A')
                        ? 'green'
                        : 'red',
                  }}
                >
                  {dayjs(appointment.time).format('h:mm A') > dayjs().format('h:mm A')
                    ? 'Show'
                    : 'No Show'}
                </TableCell>
                <TableCell>
                  {appointment?.car?.status === 'Sold' ? (
                    <Badge variant="success">Yes</Badge>
                  ) : (
                    <Badge variant="danger">No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {appointment.isNew ? <Badge>New</Badge> : <Badge>Used</Badge>}
                </TableCell>
                <TableCell>{appointment?.salesRep?.name ?? ''}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {loading && <Loader />}
      <div style={{ margin: '20px auto', width: 'fit-content' }}>
        <Pagination onChange={handleSetPagination} total={total} perPage={limit} page={page} />
      </div>
    </Card>
  );
});

export default AppointmentsToday;
