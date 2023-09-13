import React from 'react';
import { Label } from '../common/index.js';
import { ENV_VARIABLES } from '../../config/environment.js';
import { deleteCarImage } from '../../libs/apis/car.api.js';

const CarImages = (props: any) => {
  console.log('props', props);
  const pictures = [];
  Object.keys(props.record.params).forEach((key) => {
    if (`${key}`.includes('pictures.')) {
      pictures.push(props.record.params[key]);
    }
  });

  // const deleteImage = React.useCallback(async (imageUrl: string) => {
  //   try {
  //     imageUrl = encodeURIComponent(imageUrl);
  //     await deleteCarImage(props.record.id, imageUrl, ENV_VARIABLES.API_URI);
  //     console.log('Image Deleted Succesfully');
  //   } catch (error) {
  //     console.log('---', error);
  //   }
  // }, []);

  const deleteImage = async (imageUrl: string) => {
    try {
      await deleteCarImage(props.record.id, imageUrl);
      console.log('Image Deleted Succesfully');
    } catch (error) {
      console.log('---', error);
    }
  };

  console.log('pictures', pictures);
  return (
    <div style={{ marginBottom: '24px' }}>
      <Label>Pictures</Label>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ whiteSpace: 'nowrap' }}>
          {pictures.map((picture) => {
            return (
              <>
                <button onClick={(e) => deleteImage(picture)}>Delete image</button>
                <img
                  style={{
                    maxWidth: '100%',
                    height: '300px',
                    display: 'inline-block', // To keep images inline
                  }}
                  key={picture}
                  src={picture}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CarImages;
