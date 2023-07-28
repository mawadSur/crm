import React, { useState } from 'react';
// import styles from './calculator.module.css';
import { styled } from '@adminjs/design-system/styled-components';

const Table = styled('table')`
  width: 50%;
  float: left;
  padding: 20px;
  border: 2px solid red;
`;

const Input = styled('Input')`
  background: black;
  width: 50%;
  float: left;
  padding: 20px;
  border: 2px solid red;
`;

const Calculator = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const LoanPaymentMatrix = () => {
  const [marketValue, setMarketValue] = useState('0');
  const [taxableFees, setTaxableFees] = useState('0');
  const [docFee, setDocFee] = useState('0');
  const [gatavt, setGatavt] = useState('0');
  const [nontaxFees, setNontaxFees] = useState('0');
  const [apr, setApr] = useState('0');

  const calculatePayment = (loanTerm) => {
    const principal =
      parseFloat(marketValue) +
      parseFloat(taxableFees) +
      parseFloat(docFee) +
      parseFloat(gatavt) +
      parseFloat(nontaxFees);
    const interest = parseFloat(apr) / 100 / 12;
    const payment = (principal * interest) / (1 - Math.pow(1 + interest, -loanTerm));
    return payment.toFixed(2);
  };

  return (
    <Calculator /* className={styles.calculator} */>
      <Table /* className={styles.table} */>
        <thead>
          <tr>
            <th>Term</th>
            <th>Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          {[48, 60, 72].map((term) => (
            <tr key={term}>
              <td>{term} months</td>
              <td>${calculatePayment(term)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div /* className={styles.input} */>
        <label>
          Market Value Selling Price:{' '}
          <Input
            type="number"
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
          />
        </label>
        <label>
          Taxable Fees:{' '}
          <Input
            type="number"
            value={taxableFees}
            onChange={(e) => setTaxableFees(e.target.value)}
          />
        </label>
        <label>
          Doc Fee:{' '}
          <Input type="number" value={docFee} onChange={(e) => setDocFee(e.target.value)} />
        </label>
        <label>
          GATAVT: <Input type="number" value={gatavt} onChange={(e) => setGatavt(e.target.value)} />
        </label>
        <label>
          Non-Tax Fees:{' '}
          <Input type="number" value={nontaxFees} onChange={(e) => setNontaxFees(e.target.value)} />
        </label>
        <label>
          APR: <Input type="number" value={apr} onChange={(e) => setApr(e.target.value)} />
        </label>
      </div>
    </Calculator>
  );
};

export default LoanPaymentMatrix;
