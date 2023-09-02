import { styled } from '@adminjs/design-system/styled-components';

// HeaderTop
const CompanyInfo = styled.div`
  display: flex;
  // border: 1px solid;
  width: 100%;
`;

const CompanyDetails = styled.div`
  width: 50%;
  // border: 1px solid saddlebrown;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const CompanyTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
`;

const CompanyName = styled.p`
  font-weight: 100;
  font-size: 32px;
  margin-block: 5px;
`;

const CompanyDescription = styled.p`
  font-size: 16px;
`;

const CompanyBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const CompanyEmployeeInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 5px;
`;

const HeaderCell2Input = styled.input`
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: inherit;
`;
// HeaderBottom

const CustomerInfo = styled.div`
  // border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomerInfoType = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: 600;
`;

const CustomerDetails = styled.div`
  width: 100%;
  // display: flex;
  // flex-direction: row;
  border-top: 4px solid black;
  border-bottom: 1px solid black;
  padding-block: 1px;
`;
const CustomerDetailsInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-top: 1px solid black;
  border-bottom: 4px solid black;
`;

const CustomerHeader = styled.div`
  width: 50%;
  // border: 1px solid;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid;
  padding: 2px;
`;

const CustomerBasicInfo = styled.div`
  width: 50%;
  // border: 1px solid;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid;
  padding: 2px;
`;

const CustomerDataInfo = styled.div`
  // border: 1px solid;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid;
`;

// MiddleRow

const CarInfo = styled.div`
  width: 100%;
  border-bottom: 4px solid;
  // border: 1px solid;
`;

const CarType = styled.div`
  width: 100%;
  // border: 1px solid red;
  padding: 10px;
`;

const CarDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-inline: 10px;
  border-bottom: 1px solid;
`;
const CarDetailHeader = styled.div`
  width: 25%;
  // border: 1px solid;
  // padding: 10px;
`;

const CarBasicInfo = styled.div`
  width: 100%;
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid;
`;
const CarBasicInfoHeader = styled.div`
  width: 50%;
  // border: 1px solid;
  padding-inline: 10px;
  padding-top: 10px;
`;

const CarTypeInfo = styled.div`
  // padding: 10px 0px 0px 0px;
  width: 100%;
  border-bottom: 1px solid;
  margin-bottom: 5px;
  padding-inline: 10px;
  padding-top: 10px;
`;
const SpanCommon = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const InputCommon = styled.input`
  // flex: 0 0 20%;
  // padding: 10px;
  // width:  20%
  // border-radius: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: inherit;
  // direction: rtl;
`;

// calculator

const CalculatorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid;
  padding: 5px;
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
  // display: flex;
  // flex-wrap: wrap;
  // gap: 20px;
  // justify-content: space-between;
  // align-items: center;
  // width:50%;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border-radius: 8px;
  border: none; 
  border-bottom: 2px solid #ccc; 
  outline: none; 
  background-color: inherit;
  direction: rtl;
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
  CompanyInfo,
  CompanyDetails,
  CompanyBasicInfo,
  CompanyEmployeeInfo,
  CustomerInfo,
  CustomerInfoType,
  CustomerDetails,
  CustomerHeader,
  CustomerBasicInfo,
  CustomerDataInfo,
  InputCommon,
  SpanCommon,
  CompanyName,
  CompanyTitle,
  CompanyDescription,
  HeaderCell2Input,
  CarInfo,
  CarType,
  CarDetails,
  CarDetailHeader,
  CarBasicInfo,
  CarBasicInfoHeader,
  CarTypeInfo,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  InputContainer,
  Label,
  Input,
  InputRow,
  Result,
  CustomerDetailsInfo,
};

export default calculatorStyle;
