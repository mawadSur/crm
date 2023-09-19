import { Loader } from '@adminjs/design-system';
import React from 'react';
import { Trash2 } from 'react-feather';
import { deleteCarImage } from '../../libs/apis/car.api.js';
import { Label } from '../common/index.js';

const CarImages = (props: any) => {
  let carImages = [];
  const [pictures, setPictures] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      await deleteCarImage(props?.property?.props?.apiURI, props.record.id, imageUrl);
      carImages = carImages.filter((x) => x !== imageUrl);
      setPictures(carImages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
              <>
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    height: '300px',
                    margin: '8px',
                  }}
                >
                  <button
                    disabled={loading}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      cursor: 'pointer',
                      backgroundImage: 'linear-gradient(#d9d9d9, #5f5f5f, #444444)',
                    }}
                  >
                    <Trash2
                      onClick={(e) => deleteImage(picture)}
                      key={`${picture}-trash`}
                      style={{ color: '#d7d7d7' }}
                    />
                  </button>
                  {loading && <Loader />}
                  <img
                    style={{
                      maxWidth: '100%',
                      height: '300px',
                    }}
                    key={picture}
                    src={picture}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CarImages;
