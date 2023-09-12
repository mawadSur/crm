import React from 'react';
import { Label } from '../common/index.js';

const CarImages = (props: any) => {
  console.log('props', props);
  const pictures = [];
  Object.keys(props.record.params).forEach((key) => {
    if (`${key}`.includes('pictures.')) {
      pictures.push(props.record.params[key]);
    }
  });

  console.log('pictures', pictures);
  return (
    <div style={{ marginBottom: '24px' }}>
      <Label>Pictures</Label>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ whiteSpace: 'nowrap' }}>
          {pictures.map((picture) => {
            return (
              <img
                style={{
                  maxWidth: '100%',
                  height: '300px',
                  display: 'inline-block', // To keep images inline
                }}
                key={picture}
                src={picture}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CarImages;
