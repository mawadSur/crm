import { styled } from '@adminjs/design-system/styled-components';

const CalculatorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #e0e0e0;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f5f5f5;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Label = styled.label`
  flex: 1 0 50%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-left: 10px;
`;

const Input = styled.input`
  flex: 0 0 20%;
  padding: 10px;
  width:  20%
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const Result = styled.div`
  grid-column: span 2;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  margin-top: 20px;
`;

const calculatorStyle = {
  CalculatorWrapper,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  InputContainer,
  Label,
  Input,
  Result,
};

export default calculatorStyle;
