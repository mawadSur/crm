import React from 'react';

import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import {
  lunchCampaignToAllCustomers,
  lunchCampaignToCustomers,
} from '../../libs/apis/customer.api.js';
import { dateFormat, objectToQueryParams } from '../../utils/functions.js';
import { Input } from '../common/index.js';
import CampaignStyle from './style.js';
import { Loader } from '@adminjs/design-system';

const BlastCampaignCard = React.memo(() => {
  const [apiURI, setApiURI] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [totalCustomers, setTotalCustomers] = React.useState(0);
  const [customers, setCustomers] = React.useState([]);
  const [totalCustomerValid, setTotalCustomerValid] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [launchLoading, setLaunchLoading] = React.useState(false);
  const [totalLaunchSuccess, setTotalLaunchSuccess] = React.useState(0);
  const [totalLaunchFailed, setTotalLaunchFailed] = React.useState(0);
  const [prompt, setPrompt] = React.useState(
    'Hey ${number.name}, \n\nThis is Alex from Stone Mountain Toyota. \n\n Are you interested in buying at the moment?\n\nThanks,\n\nAlex',
  );
  const [filterValue, setFilterValue] = React.useState({
    name: '',
    email: '',
    location: '',
    occupation: '',
    sourceOfLead: '',
    contact: '',
    age: null,
    purchase: '',
    carMake: '',
    carModel: '',
    carYear: '',
    carColor: '',
    carPrice: '',
    leaseOfPurchase: '',
    lastServiceDate: '',
    tradeIn: '',
    testDriveHistory: '',
    financingStatus: '',
    type: '',
    warrantyStatus: '',
  });
  const api = new ApiClient();

  React.useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'campaign',
        });

        const { data } = response;
        if (data?.data?.customerCount) {
          setTotalCustomers(data.data.customerCount);
        }
        if (data?.apiURI) {
          setApiURI(data.apiURI);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchCustomerCount();
  }, []);

  React.useEffect(() => {
    if (!apiURI) return;
    const delayDebounceFn = setTimeout(async () => {
      (async () => {
        try {
          const query = objectToQueryParams(filterValue);
          if (!query) {
            setCustomers([]);
            setTotalCustomerValid(0);
            return;
          }
          setLoading(true);
          const response = await fetch(`${apiURI}/customers?${query}&unlimited=true`);
          const data = await response.json();
          if (data?.total > 0) {
            setCustomers(data.items);
            setTotalCustomerValid(data.total);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log('error', error);
        }
      })();
    }, 2000); //! Debounce for search

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [filterValue, apiURI]);

  const handleClick = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, []);

  const handleInputChange = React.useCallback((e) => {
    const name = e.target.name;
    setFilterValue({
      ...filterValue,
      [name]: e.target.value,
    });
  }, []);

  const handleLaunch = React.useCallback(
    async (customers, prompt) => {
      if (!customers || !prompt) return;
      resetData();
      try {
        setLaunchLoading(true);
        const data = await lunchCampaignToCustomers(
          customers.map((customer) => customer._id),
          prompt,
          apiURI,
        );
        console.log(data);
        if (data) {
          setTotalLaunchFailed(data?.totalFailed);
          setTotalLaunchSuccess(data?.totalSuccess);
        }
        setLaunchLoading(false);
      } catch (error) {
        setLaunchLoading(false);
        console.log('error', error);
      }
    },
    [apiURI],
  );

  const handleLaunchAll = React.useCallback(
    async (prompt) => {
      if (!prompt) return;
      resetData();
      try {
        setLaunchLoading(true);
        const data = await lunchCampaignToAllCustomers(prompt, apiURI);
        if (data) {
          setTotalLaunchFailed(data?.totalFailed);
          setTotalLaunchSuccess(data?.totalSuccess);
        }
        setLaunchLoading(false);
      } catch (error) {
        setLaunchLoading(false);
        console.log('error', error);
      }
    },
    [apiURI],
  );

  const resetData = React.useCallback(() => {
    setCustomers([]);
    setTotalLaunchSuccess(null);
    setTotalLaunchFailed(null);
  }, []);

  const handleChangePrompt = React.useCallback((e) => {
    const delayDebounceFn = setTimeout(async () => {
      setPrompt(e.target.value);
    }, 2000); //! Debounce for change data

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, []);

  console.log('totalLaunchFailed', totalLaunchFailed);
  console.log('totalLaunchSuccess', totalLaunchSuccess);

  return (
    <CampaignStyle.ContainerCampaign>
      <CampaignStyle.Card onClick={handleClick} open={isMenuOpen}>
        <CampaignStyle.Title>Blast Campaign</CampaignStyle.Title>
      </CampaignStyle.Card>
      <CampaignStyle.Dropdown open={isMenuOpen}>
        <p>
          Total Customers: {totalCustomerValid} / {totalCustomers}
        </p>
        <Input
          placeholder="Filter by name"
          type="text"
          name="name"
          value={filterValue.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by email"
          type="email"
          name="email"
          value={filterValue.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by occupation"
          type="text"
          name="occupation"
          value={filterValue.occupation}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by source of lead"
          type="text"
          name="sourceOfLead"
          value={filterValue.sourceOfLead}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by preferred contact method"
          type="text"
          name="contact"
          value={filterValue.contact}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Age"
          type="number"
          max={100}
          min={1}
          name="age"
          value={filterValue.age}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by location"
          disabled={true}
          name="location"
          value={filterValue.location}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by purchase history"
          type="text"
          disabled={true}
          name="purchase"
          value={filterValue.purchase}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by car make"
          type="text"
          disabled={true}
          name="carMake"
          value={filterValue.carMake}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by car model"
          type="text"
          disabled={true}
          name="carModel"
          value={filterValue.carModel}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by car year"
          type="text"
          disabled={true}
          name="carYear"
          value={filterValue.carYear}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by car color"
          type="text"
          disabled={true}
          name="carColor"
          value={filterValue.carColor}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by car price range"
          type="number"
          disabled={true}
          name="carPrice"
          value={filterValue.carPrice}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by lease or purchase"
          type="text"
          disabled={true}
          name="leaseOfPurchase"
          value={filterValue.leaseOfPurchase}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Filter by last service date"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="lastServiceDate"
          value={filterValue.lastServiceDate}
        />
        <Input
          placeholder="Filter by warranty status"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="warrantyStatus"
          value={filterValue.warrantyStatus}
        />
        <Input
          placeholder="Filter by financing status"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="financingStatus"
          value={filterValue.financingStatus}
        />
        <Input
          placeholder="Filter by customer type (new/returning)"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="type"
          value={filterValue.type}
        />
        <Input
          placeholder="Filter by test drive history"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="testDriveHistory"
          value={filterValue.testDriveHistory}
        />
        <Input
          placeholder="Filter by trade-in history"
          onChange={handleInputChange}
          type="text"
          disabled={true}
          name="tradeIn"
          value={filterValue.tradeIn}
        />

        <CampaignStyle.LaunchFormWrapper>
          <CampaignStyle.Textarea defaultValue={prompt} onChange={handleChangePrompt} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <CampaignStyle.LaunchButton
              disabled={customers?.length === 0 || !prompt || loading || launchLoading}
              onClick={() => handleLaunch(customers, prompt)}
            >
              Launch
            </CampaignStyle.LaunchButton>
            <CampaignStyle.LaunchButton
              disabled={!prompt || loading || launchLoading || customers.length > 0}
              onClick={() => handleLaunchAll(prompt)}
            >
              Launch All
            </CampaignStyle.LaunchButton>
          </div>
        </CampaignStyle.LaunchFormWrapper>

        <div style={{ marginTop: '10px' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p>
              {totalLaunchFailed ?? 0} Failed / {totalLaunchSuccess ?? 0} Success
            </p>
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          {loading || launchLoading ? (
            <Loader />
          ) : (
            customers?.length > 0 && (
              <>
                <Table>
                  <TableCaption>{'Customers matched filter'}</TableCaption>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Date of Birth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers?.map((customer) => (
                      <TableRow key={customer?._id}>
                        <TableCell>{customer?.email}</TableCell>
                        <TableCell>{customer?.name}</TableCell>
                        <TableCell>{customer?.age}</TableCell>
                        <TableCell>
                          <Badge>{customer?.gender}</Badge>
                        </TableCell>
                        <TableCell>{customer?.address}</TableCell>
                        <TableCell>{dateFormat(customer?.dateOfBirth)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )
          )}
        </div>
      </CampaignStyle.Dropdown>
    </CampaignStyle.ContainerCampaign>
  );
});

export default BlastCampaignCard;
