import { styled } from '@adminjs/design-system/styled-components';

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto; /* Enable scroll if needed */
}
`;

export const ModalContent = styled.div`
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  border: 1px solid #888;
  max-width: 800px;
`;

export const HalfDiv = styled.div`
  width: 50%;
`;

export const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
