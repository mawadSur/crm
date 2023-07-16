import React, { useState } from 'react';
// import styles from './calculator.module.css';

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
    <div /* className={styles.calculator} */>
      <table /* className={styles.table} */>
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
      </table>

      <div /* className={styles.input} */>
        <label>
          Market Value Selling Price:{' '}
          <input
            type="number"
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
          />
        </label>
        <label>
          Taxable Fees:{' '}
          <input
            type="number"
            value={taxableFees}
            onChange={(e) => setTaxableFees(e.target.value)}
          />
        </label>
        <label>
          Doc Fee:{' '}
          <input type="number" value={docFee} onChange={(e) => setDocFee(e.target.value)} />
        </label>
        <label>
          GATAVT: <input type="number" value={gatavt} onChange={(e) => setGatavt(e.target.value)} />
        </label>
        <label>
          Non-Tax Fees:{' '}
          <input type="number" value={nontaxFees} onChange={(e) => setNontaxFees(e.target.value)} />
        </label>
        <label>
          APR: <input type="number" value={apr} onChange={(e) => setApr(e.target.value)} />
        </label>
      </div>
    </div>
  );
};

export default LoanPaymentMatrix;
