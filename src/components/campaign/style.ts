import { styled } from '@adminjs/design-system/styled-components';
import { keyframes } from 'styled-components';

const Card = styled.div`
  width: 80%;
  padding: 20px;
  margin: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background: white;
  border-radius: ${({ open }) => (open ? '10px 10px 0 0' : '10px')};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const Dropdown = styled.div`
  display: flex;
  flex-wrap: wrap; // Allows the content to wrap onto the next line.
  justify-content: space-between;
  gap: 10px;
  width: 80%;
  margin: auto;
  background: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: ${({ open }) => (open ? 'block' : 'none')}; /* Show only if 'open' is true */

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 0 0 calc(50% - 10px); // Each input will take roughly half the container width minus the gap.
  margin-bottom: 10px;
  margin: 10px;

  @media (max-width: 600px) {
    flex: 0 0 100%;
  }
`;

const LaunchButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  background-color: #007bff; // A nice shade of blue.
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; // A darker shade for hover effect.
  }

  & > svg {
    margin-right: 8px;
  }
`;

const campaignStyle = {
  Card,
  Title,
  Dropdown,
  Input,
  LaunchButton,
};

export default campaignStyle;
