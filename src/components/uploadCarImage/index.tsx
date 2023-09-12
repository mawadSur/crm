import React from 'react';
import UploadStyle from './style.js';
import { uploadCarImage } from '../../libs/apis/car.api.js';
import { useNavigate } from 'react-router-dom';

const UploadCarImage = (props: any) => {
  const navigate = useNavigate();
  const inputRef = React.useRef();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleDrop = React.useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  }, []);

  const handleFileInputChange = React.useCallback((event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  }, []);

  const handleImageUpload = React.useCallback((file) => {
    if (!file) return;

    if (file.size > 1024 * 1024 * 5) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  }, []);

  const handleRemoveImage = React.useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleOpenUploader = React.useCallback(() => {
    if (!inputRef?.current) return;
    (inputRef.current as any).click();
  }, [inputRef]);

  const submit = React.useCallback(async () => {
    setLoading(true);
    try {
      await uploadCarImage(props.record.params.id, file, props.record.apiURI);
      navigate(-1);
      setLoading(false);
    } catch (error) {
      console.log('---', error);
      setLoading(false);
      setError('Upload failed, please try again later');
    }
  }, [selectedImage]);

  React.useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError(null);
    }, 4000);
  }, [error]);

  return (
    <>
      {error ? <UploadStyle.Alert>{error ?? ''}</UploadStyle.Alert> : null}
      <div
        onClick={handleOpenUploader}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {selectedImage ? (
          <UploadStyle.ImageViewer>
            <UploadStyle.Image src={selectedImage} alt="Uploaded" />
            <UploadStyle.RemoveButton onClick={handleRemoveImage}>
              Remove Image
            </UploadStyle.RemoveButton>

            <UploadStyle.UploadButton disabled={!selectedImage || loading} onClick={submit}>
              Upload
            </UploadStyle.UploadButton>
          </UploadStyle.ImageViewer>
        ) : (
          <UploadStyle.UploadSection>
            <p>Drop an image here or click to upload</p>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileInputChange} />
          </UploadStyle.UploadSection>
        )}
      </div>
    </>
  );
};
export default UploadCarImage;
