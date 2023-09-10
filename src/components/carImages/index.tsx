import React from 'react';
import { Label } from '../common/index.js';

const CarImages = (props: any) => {
  console.log('props', props);
  return (
    <div style={{ marginBottom: '24px' }}>
      <Label>Pictures</Label>
      <div>pictures inprogress</div>
    </div>
  );
};
export default CarImages;
