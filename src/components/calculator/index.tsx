import React, { useState, useRef } from 'react';
import calculatorStyle from './style.js';
import domtoimage from 'dom-to-image';

const LoanPaymentMatrix = () => {
  const [marketValue, setMarketValue] = useState('0');
  const [taxableFees, setTaxableFees] = useState('0');
  const [docFee, setDocFee] = useState('0');
  const [gatavt, setGatavt] = useState('0');
  const [nontaxFees, setNontaxFees] = useState('0');
  const [apr, setApr] = useState('0');
  const container = useRef(null);

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

  const handlePDFDownload = async () => {
    const img = await domtoimage.toJpeg(container.current, {
      scale: 4,
      innerWidth: '100%',
      innerHeight: '100vh',
    });
    var a = document.createElement('a');
    a.href = img;
    const imgName = 'download';
    a.download = `${imgName}.png`;
    a.click();
  };

  return (
    <>
      <button
        style={{
          width: 'max-content',
          display: 'flex',
          alignSelf: 'flex-end',
        }}
        onClick={handlePDFDownload}
      >
        Download PDF
      </button>
      <div
        id="pdf-container"
        ref={container}
        style={{ width: 'calc(100% - 20px)', color: 'black', backgroundColor: 'white' }}
      >
        <calculatorStyle.Header>
          <calculatorStyle.HeaderRow>
            <calculatorStyle.HeaderCell1>
              <calculatorStyle.CompanyTitle>PORSCHE</calculatorStyle.CompanyTitle>
              <calculatorStyle.CompanyName>
                Hennessy <span style={{ fontWeight: 900 }}>Porsche</span>
              </calculatorStyle.CompanyName>
              <calculatorStyle.CompanyDescription>
                2020 Lorem Ipsum is simply dummy text
              </calculatorStyle.CompanyDescription>
            </calculatorStyle.HeaderCell1>
          </calculatorStyle.HeaderRow>
          <calculatorStyle.HeaderRow>
            <calculatorStyle.HeaderCell2>
              <h4>Date</h4>
              <calculatorStyle.InputCommon value="1/02/2023" />
            </calculatorStyle.HeaderCell2>
            <calculatorStyle.HeaderCell2>
              <h4>Sales Person</h4>
              <calculatorStyle.InputCommon value="Rakesh Sharma" />
            </calculatorStyle.HeaderCell2>
            <calculatorStyle.HeaderCell2>
              <h4>Manager</h4>
              <calculatorStyle.InputCommon value="Rakesh Sharma" />
            </calculatorStyle.HeaderCell2>
          </calculatorStyle.HeaderRow>
        </calculatorStyle.Header>

        {/* HeaderBottom */}

        <calculatorStyle.BottomHeader>
          <calculatorStyle.BottomFirstDiv>FOR INTERNAL USE ONLY</calculatorStyle.BottomFirstDiv>
          <calculatorStyle.BottomSecondDiv>
            <calculatorStyle.BottomThirdDiv>
              <calculatorStyle.BS1>
                <calculatorStyle.BSRow>
                  <h1>CUSTOMER</h1>
                  <calculatorStyle.InputCommon value="Muhammad Awad" />
                </calculatorStyle.BSRow>
                <calculatorStyle.BSRow>
                  <p>Home Phone</p>
                  <calculatorStyle.InputCommon value="0987654321" />
                </calculatorStyle.BSRow>
                <calculatorStyle.BSRow>
                  <p>Address</p>
                  <calculatorStyle.InputCommon value="street-4, New Work" />
                </calculatorStyle.BSRow>
              </calculatorStyle.BS1>
              <calculatorStyle.BS2>
                <calculatorStyle.BSRow>
                  <p>Work Phone</p>
                  <calculatorStyle.InputCommon value="1234567890" />
                </calculatorStyle.BSRow>
                <calculatorStyle.BSRow>
                  <p>E-Mail:</p>
                  <calculatorStyle.InputCommon value="a@gmail.com" />
                </calculatorStyle.BSRow>
                <calculatorStyle.BSRow>
                  <p>Cell Phone:</p>
                  <calculatorStyle.InputCommon value="(404)791-9456" />
                </calculatorStyle.BSRow>
              </calculatorStyle.BS2>
            </calculatorStyle.BottomThirdDiv>
          </calculatorStyle.BottomSecondDiv>
        </calculatorStyle.BottomHeader>

        {/* MiddleRow */}

        <calculatorStyle.SecondBottom>
          <calculatorStyle.SB11>
            <p>VEHICLE</p>
          </calculatorStyle.SB11>
          <calculatorStyle.SB22>
            <calculatorStyle.SB22Child>
              Stock #:<calculatorStyle.SpanCommon>N847488H</calculatorStyle.SpanCommon>
            </calculatorStyle.SB22Child>
            <calculatorStyle.SB22Child>
              New/Used:<calculatorStyle.SpanCommon>Used</calculatorStyle.SpanCommon>
            </calculatorStyle.SB22Child>
            <calculatorStyle.SB22Child>
              VIN:<calculatorStyle.SpanCommon>7BHDOH8KUGBDJKD</calculatorStyle.SpanCommon>
            </calculatorStyle.SB22Child>
            <calculatorStyle.SB22Child>
              Mileage:<calculatorStyle.SpanCommon>54</calculatorStyle.SpanCommon>
            </calculatorStyle.SB22Child>
          </calculatorStyle.SB22>
          <calculatorStyle.SB33>
            <calculatorStyle.SB33Child>
              Vehicle:<calculatorStyle.SpanCommon>2023 Rivian R1S</calculatorStyle.SpanCommon>
            </calculatorStyle.SB33Child>
            <calculatorStyle.SB33Child>
              Color:<calculatorStyle.SpanCommon>Launch Green</calculatorStyle.SpanCommon>
            </calculatorStyle.SB33Child>
          </calculatorStyle.SB33>
          <calculatorStyle.SB44>
            <p>
              Type:
              <calculatorStyle.SpanCommon>
                Launch Edition All-Wheel Drive Spor
              </calculatorStyle.SpanCommon>
            </p>
          </calculatorStyle.SB44>
        </calculatorStyle.SecondBottom>

        {/* Calculator */}
        <calculatorStyle.CalculatorWrapper>
          <calculatorStyle.Table>
            <thead>
              <tr style={{ borderBottom: '1px solid' }}>
                <td>Load Payments</td>
                <td>Estimated</td>
              </tr>
              <tr style={{ background: '#ccc' }}>
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
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>Market Value Selling Price:</calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={marketValue}
                onChange={(e) => setMarketValue(e.target.value)}
              />
            </calculatorStyle.InputRow>
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>Taxable Fees:</calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={taxableFees}
                onChange={(e) => setTaxableFees(e.target.value)}
              />
            </calculatorStyle.InputRow>
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>Doc Fee:</calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={docFee}
                onChange={(e) => setDocFee(e.target.value)}
              />
            </calculatorStyle.InputRow>
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>GATAVT:</calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={gatavt}
                onChange={(e) => setGatavt(e.target.value)}
              />
            </calculatorStyle.InputRow>
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>Non-Tax Fees:</calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={nontaxFees}
                onChange={(e) => setNontaxFees(e.target.value)}
              />
            </calculatorStyle.InputRow>
            <calculatorStyle.InputRow>
              <calculatorStyle.Label>APR: </calculatorStyle.Label>
              <calculatorStyle.Input
                type="number"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
              />
            </calculatorStyle.InputRow>
          </calculatorStyle.InputContainer>

          <calculatorStyle.Result>
            Monthly Payment: ${calculatePayment(60)}{' '}
            {/* Display the calculated payment for a specific term */}
          </calculatorStyle.Result>
        </calculatorStyle.CalculatorWrapper>
      </div>
    </>
  );
};

export default LoanPaymentMatrix;
