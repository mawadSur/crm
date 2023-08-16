import { styled } from '@adminjs/design-system/styled-components';

const ContainerCampaign = styled.div`
  padding: 2rem 4rem;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
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
  width: 100%;
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

  &:disabled {
    cursor: not-allowed;
    background-color: #e9ecef;
  }
`;

const Table = styled.table`
  margin: 0 auto;
  margin-top: 2rem;
  width: 80%;
  caption-side: top;
  border: none;
  border-collapse: collapse;
  caption-side: bottom;

  td,
  th {
    border: none;
    padding: 5px 10px;
  }

  td {
    padding: 5px 10px;
    text-align: center;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #bcdef4;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const LaunchFormWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 550px;
  margin: 0 auto;
`;

const Textarea = styled.textarea`
  width: 450px;
  height: fit-content;
  min-height: 100px;
`;

const campaignStyle = {
  Card,
  Title,
  Dropdown,
  LaunchButton,
  ContainerCampaign,
  Table,
  LaunchFormWrapper,
  Textarea,
};

export default campaignStyle;
