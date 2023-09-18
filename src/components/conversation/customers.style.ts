import { styled } from '@adminjs/design-system/styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 5px;
  max-width: 1200px;
  margin: 100px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background-color: #f5f5f5;
  color: #333;
  border-bottom: 2px solid #ddd;
`;

export const TableRow = styled.tr`
  &:first-child {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #555;
`;

export const StyledHeading = styled.h2`
  font-family: Roboto, sans-serif;
  vertical-align: middle;
  padding: 0;
  font-size: 28px;
  line-height: 40px;
  font-weight: 400;
  margin-bottom: 32px;
  margin-top: 32px;
`;

export const ShowButton = styled.button`
  display: block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
