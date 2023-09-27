import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  getConversationByCustomerId,
  getCustomerActivities,
  getCustomerInsurances,
  getCustomerServices,
  getCustomerVehicles,
} from '../../libs/apis/index.js';
import { dateFormat, formatPhoneNumber, formatPrice } from '../../utils/index.js';
import { Text, TextAlert, Title } from './style.js';
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from '@adminjs/design-system';
import Modal from 'react-modal';
import { XCircle } from 'react-feather';
export interface ITransactionModalProps {
  onClose: () => void;
  opportunity: any;
  apiURI: string;
  open: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TransactionModal = ({ onClose, opportunity, apiURI, open }: ITransactionModalProps) => {
  const [tab, setTap] = React.useState('0');
  const [loading, setLoading] = React.useState(false);
  const [customer, setCustomer] = React.useState({});
  const [customerServices, setCustomerServices] = React.useState([]);
  const [customerInsurances, setCustomerInsurances] = React.useState([]);
  const [customerVehicles, setCustomerVehicles] = React.useState([]);
  const [customerActivities, setCustomerActivities] = React.useState([]);
  const [deskLogData, setDeskLogData] = useState([]);

  const handleChange = (tab: string) => {
    setTap(tab);
  };

  useEffect(() => {
    if (open) {
      fetch(`${apiURI}/desklogs`)
        .then((response) => response.json())
        .then((data) => {
          setDeskLogData(data.items); // Assuming 'items' is the array of data in the API response
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [open]);

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
  return (
    <Modal styles={{ width: '450px !important' }} isOpen={open} ariaHideApp={true}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <XCircle onClick={onClose} style={{ cursor: 'pointer' }} />
      </div>
      <Box sx={style} md={style}>
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
            <div>{/* <b>Text Preferred:</b> {customer?.textPreferred ? 'Yes' : 'No'} */}</div>
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
            <Text>
              <b>Up Type:</b> {opportunity?.customer?.upType}
            </Text>
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
              <Tabs fullWidth={true} currentTab={tab} onChange={handleChange}>
                <Tab id={'0'} label="Other Contacts">
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
                  {otherContracts?.length === 0 && (
                    <TextAlert>There are no contacts added</TextAlert>
                  )}
                </Tab>
                <Tab id={'1'} label="Customer Services">
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
                </Tab>
                <Tab id={'2'} label="Relationships">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>{/* <TableCell></TableCell> */}</TableRow>
                    </TableHead>
                    <TableBody>
                      {relationships?.map((rel) => {
                        return (
                          <TableRow id={rel._id}>
                            <TableCell>
                              <h2 style={{ fontWeight: 'bold' }}>{rel.name}</h2>
                              <p style={{ marginTop: '0.5rem' }}>
                                Referred by: {opportunity.customer?.name}
                              </p>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    {relationships?.length === 0 && (
                      <TextAlert>There is no Service History</TextAlert>
                    )}
                  </Table>
                </Tab>
                <Tab id={'3'} label="Ins/Other">
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
                    {customerInsurances?.length === 0 && (
                      <TextAlert>No insurance uploaded</TextAlert>
                    )}
                  </Table>
                </Tab>
                <Tab id={'4'} label="Lifetime Value">
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>{/* <TableCell></TableCell> */}</TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <h2 style={{ fontWeight: 'bold' }}>{opportunity.customer?.name}</h2>
                          <p style={{ marginTop: '0.5rem' }}>Lifetime Value: $6000</p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Tab>
                <Tab id={'5'} label="Vehicles">
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
                </Tab>
                <Tab id={'6'} label="Audit Trail">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>{/* <TableCell></TableCell> */}</TableRow>
                    </TableHead>
                    <TableBody>
                      {customerActivities.map((activity) => {
                        return (
                          <TableRow key={activity._id}>
                            <TableCell>
                              {' '}
                              <h2
                                style={{ fontWeight: 'bold' }}
                              >{`${activity?.customerId?.name} ${activity?.activityId?.name}`}</h2>
                              <p style={{ marginTop: '0.5rem' }}>
                                {dateFormat(activity?.createdAt, true)}
                              </p>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    {customerActivities?.length === 0 && (
                      <TextAlert>There are no logs recorded</TextAlert>
                    )}
                  </Table>
                </Tab>
              </Tabs>
            </Box>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
