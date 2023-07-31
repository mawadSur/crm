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
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 80%;
  max-width: 800px;
`;

export const HalfDiv = styled.div`
  width: 50%;
`;
