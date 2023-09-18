import { ApiClient } from 'adminjs';
import React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableCaption,
  TableHead,
  TableBody,
  Badge,
  Loader,
} from '@adminjs/design-system';
import Pagination from '../common/pagination/index.js';
import { dateFormat } from '../../utils/functions.js';

const BlastNewest = () => {
  const api = new ApiClient();
  const [limit, setLimit] = React.useState(50);
  const [total, setTotal] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [apiURI, setApiURI] = React.useState('');
  const [blasts, setBlasts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchServerSide = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'blast',
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
        const response = await fetch(`${apiURI}/blasts/newest?limit=${limit}&offset=0`);
        const data = await response.json();
        if (data?.items?.length) {
          setBlasts(data.items);
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
  }, [apiURI]);

  const handleSetPagination = React.useCallback(
    (_, value) => {
      setOffset((value - 1) * limit);
      setPage(value);
    },
    [offset, limit, apiURI],
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        padding: '20px',
        background: '#fff',
      }}
    >
      <Table>
        <TableCaption>Blast Newest</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Context</TableCell>
            <TableCell>Is Send Message</TableCell>
            <TableCell>Is Newest</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blasts?.map((blast) => (
            <TableRow onClick={() => console.log(blast)} key={blast?._id}>
              <TableCell>{blast?._id}</TableCell>
              <TableCell>{blast?.phone}</TableCell>
              <TableCell>{blast?.customerId?.name}</TableCell>
              <TableCell>{blast?.context}</TableCell>
              <TableCell>{blast?.isSendMessage ? <Badge>Yes</Badge> : <Badge>No</Badge>}</TableCell>
              <TableCell>{blast?.isSendNewest ? <Badge>Yes</Badge> : <Badge>No</Badge>}</TableCell>
              <TableCell>{blast?.createdAt ? dateFormat(blast.createdAt, true) : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination onChange={handleSetPagination} total={total} perPage={limit} page={page} />
    </div>
  );
};
export default BlastNewest;
