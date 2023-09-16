import React from 'react';
import { Label } from '../common/index.js';
import { deleteCarImage } from '../../libs/apis/car.api.js';
import { Trash2 } from 'react-feather';

const CarImages = (props: any) => {
  let carImages = [];
  const [pictures, setPictures] = React.useState([]);
  console.log(props);

  React.useEffect(() => {
    const pics = [];
    Object.keys(props.record.params).forEach((key) => {
      if (`${key}`.includes('pictures.')) {
        pics.push(props.record.params[key]);
      }
    });
    carImages = [...pics];
    setPictures(pics);
  }, []);

  const deleteImage = React.useCallback(async (imageUrl: string) => {
    try {
      await deleteCarImage(props?.property?.props?.apiURI, props.record.id, imageUrl);
      carImages = carImages.filter((x) => x !== imageUrl);
      setPictures(carImages);
    } catch (error) {
      console.log('---', error);
    }
  }, []);

  return (
    <div style={{ marginBottom: '24px' }}>
      <Label>Pictures</Label>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ whiteSpace: 'nowrap' }}>
          {pictures.map((picture) => {
            return (
              <React.Fragment key={picture}>
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    height: '300px',
                    margin: '8px',
                  }}
                >
                  <Trash2
                    onClick={(e) => deleteImage(picture)}
                    style={{ position: 'absolute', top: '4px', right: '4px', color: 'c20012' }}
                  />
                  <img
                    style={{
                      maxWidth: '100%',
                      height: '300px',
                    }}
                    src={picture}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CarImages;
