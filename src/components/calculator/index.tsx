import React, { useState } from 'react';
import calculatorStyle from './style.js';

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
    <calculatorStyle.CalculatorWrapper>
      <calculatorStyle.Table>
        <thead>
          <tr>
            <calculatorStyle.TableHeader>Term</calculatorStyle.TableHeader>
            <calculatorStyle.TableHeader>Monthly Payment</calculatorStyle.TableHeader>
          </tr>
        </thead>
        <tbody>
          {[48, 60, 72].map((term) => (
            <calculatorStyle.TableRow key={term}>
              <calculatorStyle.TableCell>{term} months</calculatorStyle.TableCell>
              <calculatorStyle.TableCell>${calculatePayment(term)}</calculatorStyle.TableCell>
            </calculatorStyle.TableRow>
          ))}
        </tbody>
      </calculatorStyle.Table>

      <calculatorStyle.InputContainer>
        <calculatorStyle.Label>
          Market Value Selling Price:{' '}
          <calculatorStyle.Input
            type="number"
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
          />
        </calculatorStyle.Label>
        <calculatorStyle.Label>
          Taxable Fees:{' '}
          <calculatorStyle.Input
            type="number"
            value={taxableFees}
            onChange={(e) => setTaxableFees(e.target.value)}
          />
        </calculatorStyle.Label>
        <calculatorStyle.Label>
          Doc Fee:{' '}
          <calculatorStyle.Input
            type="number"
            value={docFee}
            onChange={(e) => setDocFee(e.target.value)}
          />
        </calculatorStyle.Label>
        <calculatorStyle.Label>
          GATAVT:{' '}
          <calculatorStyle.Input
            type="number"
            value={gatavt}
            onChange={(e) => setGatavt(e.target.value)}
          />
        </calculatorStyle.Label>
        <calculatorStyle.Label>
          Non-Tax Fees:{' '}
          <calculatorStyle.Input
            type="number"
            value={nontaxFees}
            onChange={(e) => setNontaxFees(e.target.value)}
          />
        </calculatorStyle.Label>
        <calculatorStyle.Label>
          APR:{' '}
          <calculatorStyle.Input
            type="number"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
          />
        </calculatorStyle.Label>
      </calculatorStyle.InputContainer>

      <calculatorStyle.Result>
        Monthly Payment: ${calculatePayment(60)}{' '}
        {/* Display the calculated payment for a specific term */}
      </calculatorStyle.Result>
    </calculatorStyle.CalculatorWrapper>
  );
};

export default LoanPaymentMatrix;
