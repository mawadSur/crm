import domtoimage from 'dom-to-image';
import React, { useRef, useState } from 'react';
import CalculatorStyle from './style.js';

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
    const img = await domtoimage.toPng(container.current, {
      scale: 4,
      // width: '1200px',
      // height: 'auto',
    });
    var a = document.createElement('a');
    a.href = img;
    const imgName = 'download';
    a.download = `${imgName}.png`;
    a.click();
  };

  return (
    <div style={{ padding: '32px' }}>
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
        <CalculatorStyle.CompanyInfo>
          <CalculatorStyle.CompanyDetails>
            <CalculatorStyle.CompanyBasicInfo>
              <CalculatorStyle.CompanyTitle></CalculatorStyle.CompanyTitle>
              <CalculatorStyle.CompanyName>
                <span style={{ fontWeight: 900 }}>Stone Mountain Toyota</span>
              </CalculatorStyle.CompanyName>
              <CalculatorStyle.CompanyDescription>
                2023 Premier Dealer
              </CalculatorStyle.CompanyDescription>
            </CalculatorStyle.CompanyBasicInfo>
          </CalculatorStyle.CompanyDetails>
          <CalculatorStyle.CompanyDetails>
            <CalculatorStyle.CompanyEmployeeInfo>
              <h4>Date</h4>
              <CalculatorStyle.InputCommon value="1/02/2023" />
            </CalculatorStyle.CompanyEmployeeInfo>
            <CalculatorStyle.CompanyEmployeeInfo>
              <h4>Sales Person</h4>
              <CalculatorStyle.InputCommon value="Rakesh Sharma" />
            </CalculatorStyle.CompanyEmployeeInfo>
            <CalculatorStyle.CompanyEmployeeInfo>
              <h4>Manager</h4>
              <CalculatorStyle.InputCommon value="Rakesh Sharma" />
            </CalculatorStyle.CompanyEmployeeInfo>
          </CalculatorStyle.CompanyDetails>
        </CalculatorStyle.CompanyInfo>

        {/* HeaderBottom */}

        <CalculatorStyle.CustomerInfo>
          <CalculatorStyle.CustomerInfoType>FOR INTERNAL USE ONLY</CalculatorStyle.CustomerInfoType>
          <CalculatorStyle.CustomerDetails>
            <CalculatorStyle.CustomerDetailsInfo>
              <CalculatorStyle.CustomerHeader>
                <CalculatorStyle.CustomerDataInfo>
                  <h1>CUSTOMER</h1>
                  <CalculatorStyle.InputCommon value="Muhammad Awad" />
                </CalculatorStyle.CustomerDataInfo>
                <CalculatorStyle.CustomerDataInfo>
                  <p>Home Phone</p>
                  <CalculatorStyle.InputCommon value="0987654321" />
                </CalculatorStyle.CustomerDataInfo>
                <CalculatorStyle.CustomerDataInfo>
                  <p>Address</p>
                  <CalculatorStyle.InputCommon value="street-4, New Work" />
                </CalculatorStyle.CustomerDataInfo>
              </CalculatorStyle.CustomerHeader>
              <CalculatorStyle.CustomerBasicInfo>
                <CalculatorStyle.CustomerDataInfo>
                  <p>Work Phone</p>
                  <CalculatorStyle.InputCommon value="1234567890" />
                </CalculatorStyle.CustomerDataInfo>
                <CalculatorStyle.CustomerDataInfo>
                  <p>E-Mail:</p>
                  <CalculatorStyle.InputCommon value="a@gmail.com" />
                </CalculatorStyle.CustomerDataInfo>
                <CalculatorStyle.CustomerDataInfo>
                  <p>Cell Phone:</p>
                  <CalculatorStyle.InputCommon value="(404)791-9456" />
                </CalculatorStyle.CustomerDataInfo>
              </CalculatorStyle.CustomerBasicInfo>
            </CalculatorStyle.CustomerDetailsInfo>
          </CalculatorStyle.CustomerDetails>
        </CalculatorStyle.CustomerInfo>

        {/* MiddleRow as CarInfo*/}

        <CalculatorStyle.CarInfo>
          <CalculatorStyle.CarType>
            <p>VEHICLE</p>
          </CalculatorStyle.CarType>
          <CalculatorStyle.CarDetails>
            <CalculatorStyle.CarDetailHeader>
              Stock #:<CalculatorStyle.SpanCommon> N847488H</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarDetailHeader>
            <CalculatorStyle.CarDetailHeader>
              New/Used:<CalculatorStyle.SpanCommon> Used</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarDetailHeader>
            <CalculatorStyle.CarDetailHeader>
              VIN:<CalculatorStyle.SpanCommon> 7BHDOH8KUGBDJKD</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarDetailHeader>
            <CalculatorStyle.CarDetailHeader>
              Mileage:<CalculatorStyle.SpanCommon> 54</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarDetailHeader>
          </CalculatorStyle.CarDetails>
          <CalculatorStyle.CarBasicInfo>
            <CalculatorStyle.CarBasicInfoHeader>
              Vehicle:<CalculatorStyle.SpanCommon> 2023 Rivian R1S</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarBasicInfoHeader>
            <CalculatorStyle.CarBasicInfoHeader>
              Color:<CalculatorStyle.SpanCommon> Launch Green</CalculatorStyle.SpanCommon>
            </CalculatorStyle.CarBasicInfoHeader>
          </CalculatorStyle.CarBasicInfo>
          <CalculatorStyle.CarTypeInfo>
            <p>
              Type:
              <CalculatorStyle.SpanCommon>
                Launch Edition All-Wheel Drive Spor
              </CalculatorStyle.SpanCommon>
            </p>
          </CalculatorStyle.CarTypeInfo>
        </CalculatorStyle.CarInfo>

        {/* Calculator */}
        <CalculatorStyle.CalculatorWrapper>
          <CalculatorStyle.Table>
            <thead>
              <tr style={{ borderBottom: '1px solid' }}>
                <td style={{ padding: '10px' }}>Load Payments</td>
                <td style={{ padding: '10px' }}>Estimated</td>
              </tr>
              <tr style={{ background: '#ccc' }}>
                <CalculatorStyle.TableHeader>Term</CalculatorStyle.TableHeader>
                <CalculatorStyle.TableHeader>Monthly Payment</CalculatorStyle.TableHeader>
              </tr>
            </thead>
            <tbody>
              {[48, 60, 72].map((term) => (
                <CalculatorStyle.TableRow key={term}>
                  <CalculatorStyle.TableCell>{term} months</CalculatorStyle.TableCell>
                  <CalculatorStyle.TableCell>${calculatePayment(term)}</CalculatorStyle.TableCell>
                </CalculatorStyle.TableRow>
              ))}
            </tbody>
          </CalculatorStyle.Table>

          <CalculatorStyle.InputContainer>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>Market Value Selling Price:</CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={marketValue}
                onChange={(e) => setMarketValue(e.target.value)}
              />
            </CalculatorStyle.InputRow>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>Taxable Fees:</CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={taxableFees}
                onChange={(e) => setTaxableFees(e.target.value)}
              />
            </CalculatorStyle.InputRow>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>Doc Fee:</CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={docFee}
                onChange={(e) => setDocFee(e.target.value)}
              />
            </CalculatorStyle.InputRow>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>GATAVT:</CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={gatavt}
                onChange={(e) => setGatavt(e.target.value)}
              />
            </CalculatorStyle.InputRow>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>Non-Tax Fees:</CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={nontaxFees}
                onChange={(e) => setNontaxFees(e.target.value)}
              />
            </CalculatorStyle.InputRow>
            <CalculatorStyle.InputRow>
              <CalculatorStyle.Label>APR: </CalculatorStyle.Label>
              <CalculatorStyle.Input
                type="number"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
              />
            </CalculatorStyle.InputRow>
          </CalculatorStyle.InputContainer>

          <CalculatorStyle.Result>
            Monthly Payment: ${calculatePayment('60')}{' '}
            {/* Display the calculated payment for a specific term */}
          </CalculatorStyle.Result>
        </CalculatorStyle.CalculatorWrapper>
      </div>
    </div>
  );
};

export default LoanPaymentMatrix;
