import {
  Badge,
  Loader,
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../utils/functions.js';

interface Props {
  caption?: string;
}

const BlastNewest = React.memo(({ caption = 'Blast Newest' }: Props) => {
  const api = new ApiClient();
  const navigate = useNavigate();
  const [limit] = React.useState(10);
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
        const response = await fetch(`${apiURI}/blasts/newest?limit=${limit}&offset=${offset}`);
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
  }, [apiURI, limit, offset]);

  const handleSetPagination = React.useCallback(
    (value) => {
      console.log('value', value);
      setOffset((value - 1) * limit);
      setPage(value);
    },
    [offset, limit, apiURI],
  );

  const handleRedirectToBlast = React.useCallback(() => {
    console.log('total', total);
    navigate(`/admin/pages/followUp`, {
      state: { total: total },
    });
  }, [total]);

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
        <TableCaption>{caption}</TableCaption>
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
            <TableRow onClick={handleRedirectToBlast} key={blast?._id}>
              <TableCell>{blast?._id}</TableCell>
              <TableCell>{blast?.phone}</TableCell>
              <TableCell>{blast?.customerId?.name}</TableCell>
              <TableCell>{blast?.context}</TableCell>
              <TableCell>{blast?.isSendMessage ? <Badge>Yes</Badge> : <Badge>No</Badge>}</TableCell>
              {/* <TableCell>{blast?.isNewest ? <Badge>Yes</Badge> : <Badge>No</Badge>}</TableCell> */}
              <TableCell>{blast?.createdAt ? dateFormat(blast.createdAt, true) : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: '20px', margin: 'auto', width: 'fit-content' }}>
        <Pagination onChange={handleSetPagination} total={total} perPage={limit} page={page} />
      </div>
    </div>
  );
});
export default BlastNewest;
