import styled from 'styled-components';

const UploadSection = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;

  cursor: pointer;

  p {
    padding: 1rem;
  }

  input {
    display: none;
  }
`;
const ImageViewer = styled.div`
  display: grid;
  justify-content: center;
`;

const Alert = styled.div`
  color: red;
  text-align: center;
  padding: 10px;
  border: 1px solid red;
  margin: 10px auto;
  width: 500px;
  border-radius: 0.5rem;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 0 auto;
`;

const RemoveButton = styled.button`
  max-width: 200px;
  width: fit-content;
  margin: 10px auto;

  appearance: none;
  display: inline-block;
  background-color: transparent;
  outline: 0px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  vertical-align: middle;
  border-radius: 4px;
  user-select: none;
  text-align: center;
  border: 1px solid rgb(194, 0, 18);
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 0.1s ease-in 0s;
  color: rgb(194, 0, 18);
  padding: 4px 32px;
  line-height: 24px;
`;

const UploadButton = styled.button`
  max-width: 200px;
  width: fit-content;
  margin: 10px auto;

  appearance: none;
  display: inline-block;
  background-color: transparent;
  outline: 0px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  vertical-align: middle;
  border-radius: 4px;
  user-select: none;
  text-align: center;
  border: 1px solid rgb(48, 64, 214);
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  transition: all 0.1s ease-in 0s;
  color: rgb(48, 64, 214);
  padding: 4px 32px;
  line-height: 24px;
`;

const UploadStyle = {
  RemoveButton,
  Image,
  UploadSection,
  ImageViewer,
  UploadButton,
  Alert,
};

export default UploadStyle;
