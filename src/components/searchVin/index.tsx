import React from 'react';

import { Input, Loader, MessageBox, Label, Text, Box } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import { CarVinInfoInternal, convertPropertyNameToDisplayName } from '../../utils/index.js';

const SearchVin = () => {
  const api = new ApiClient();
  const [apiURI, setApiURI] = React.useState('');
  const [valueInput, setValueInput] = React.useState('');
  const [carInfo, setCarInfo] = React.useState<CarVinInfoInternal | null>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchServerSide = async () => {
      try {
        const response: any = await api.getPage({
          pageName: 'searchVin',
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
    if (!apiURI) return;
    const delayDebounceFn = setTimeout(async () => {
      (async () => {
        try {
          if (!valueInput) return;
          setLoading(true);
          const response = await fetch(`${apiURI}/cars/vin/${valueInput}`);
          const data = await response.json();
          console.log('data', data);

          if (data?.message) {
            throw new Error(data.message);
          }

          if (data?.attributes) {
            setCarInfo(data);
          }
          setLoading(false);
          setError(null);
        } catch (error) {
          setLoading(false);
          console.log('error', error);
          setError(error?.message ?? 'Something went wrong');
        }
      })();
    }, 1000); //! Debounce for search

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [apiURI, valueInput]);

  console.log('valueInput', valueInput);

  return (
    <div style={{ padding: '2rem', boxSizing: 'border-box' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          boxSizing: 'border-box',
          height: '100%',
        }}
      >
        <p
          style={{
            margin: '1rem 0',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Search VIN
        </p>

        {error ? (
          <MessageBox withInsideText={true} variant="danger" size="sm" message={error} />
        ) : (
          <></>
        )}

        <div style={{ margin: '1rem auto', width: '350px' }}>
          <Input
            width={350}
            variant={'lg'}
            min={17}
            max={17}
            label="VIN"
            placeholder="Enter VIN"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div>
            <h2 style={{ fontWeight: 'bold', margin: '1rem 0' }}>Attributes</h2>
            <div style={{ columnCount: 3, columnGap: '1rem', height: 'auto' }}>
              {carInfo?.attributes
                ? Object.keys(carInfo?.attributes).map((key) => (
                    <Box>
                      <Label variant="primary" size="lg">
                        {convertPropertyNameToDisplayName(key)}:{' '}
                        <span style={{ color: 'black' }}>{carInfo?.attributes[key]}</span>
                      </Label>
                    </Box>
                  ))
                : ''}
            </div>

            <h2 style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem' }}>
              Warranties
            </h2>
            <div style={{ columnCount: 3, columnGap: '1rem', height: 'auto' }}>
              {carInfo?.warranties?.map((item, index) => (
                <Box key={index}>
                  <Label variant="primary" size="lg">
                    {item.type}
                  </Label>
                  <Text>{item.miles}</Text>
                  <Text>{item.months}</Text>
                </Box>
              ))}
            </div>

            <h2 style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem' }}>Colors</h2>
            <div style={{ columnCount: 3, columnGap: '1rem', height: 'auto' }}>
              {carInfo?.colors?.map((item, index) => (
                <Box key={index}>
                  <Label variant="primary" size="lg">
                    {item.category}: <span style={{ color: 'black' }}>{item.name}</span>
                  </Label>
                </Box>
              ))}
            </div>

            <h2 style={{ fontWeight: 'bold', margin: '1rem 0' }}>Equipment</h2>
            <div style={{ columnCount: 3, columnGap: '1rem', height: 'auto' }}>
              {carInfo?.equipment
                ? Object.keys(carInfo?.equipment).map((key) => (
                    <Box>
                      <Label variant="primary" size="lg">
                        {convertPropertyNameToDisplayName(key)}:{' '}
                        <span style={{ color: 'black' }}>{carInfo?.equipment[key]}</span>
                      </Label>
                    </Box>
                  ))
                : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchVin;
