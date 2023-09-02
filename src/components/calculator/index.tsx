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
        <calculatorStyle.CompanyInfo>
          <calculatorStyle.CompanyDetails>
            <calculatorStyle.CompanyBasicInfo>
              <calculatorStyle.CompanyTitle>PORSCHE</calculatorStyle.CompanyTitle>
              <calculatorStyle.CompanyName>
                Hennessy <span style={{ fontWeight: 900 }}>Porsche</span>
              </calculatorStyle.CompanyName>
              <calculatorStyle.CompanyDescription>
                2020 Lorem Ipsum is simply dummy text
              </calculatorStyle.CompanyDescription>
            </calculatorStyle.CompanyBasicInfo>
          </calculatorStyle.CompanyDetails>
          <calculatorStyle.CompanyDetails>
            <calculatorStyle.CompanyEmployeeInfo>
              <h4>Date</h4>
              <calculatorStyle.InputCommon value="1/02/2023" />
            </calculatorStyle.CompanyEmployeeInfo>
            <calculatorStyle.CompanyEmployeeInfo>
              <h4>Sales Person</h4>
              <calculatorStyle.InputCommon value="Rakesh Sharma" />
            </calculatorStyle.CompanyEmployeeInfo>
            <calculatorStyle.CompanyEmployeeInfo>
              <h4>Manager</h4>
              <calculatorStyle.InputCommon value="Rakesh Sharma" />
            </calculatorStyle.CompanyEmployeeInfo>
          </calculatorStyle.CompanyDetails>
        </calculatorStyle.CompanyInfo>

        {/* HeaderBottom */}

        <calculatorStyle.CustomerInfo>
          <calculatorStyle.CustomerInfoType>FOR INTERNAL USE ONLY</calculatorStyle.CustomerInfoType>
          <calculatorStyle.CustomerDetails>
            <calculatorStyle.CustomerDetailsInfo>
              <calculatorStyle.CustomerHeader>
                <calculatorStyle.CustomerDataInfo>
                  <h1>CUSTOMER</h1>
                  <calculatorStyle.InputCommon value="Muhammad Awad" />
                </calculatorStyle.CustomerDataInfo>
                <calculatorStyle.CustomerDataInfo>
                  <p>Home Phone</p>
                  <calculatorStyle.InputCommon value="0987654321" />
                </calculatorStyle.CustomerDataInfo>
                <calculatorStyle.CustomerDataInfo>
                  <p>Address</p>
                  <calculatorStyle.InputCommon value="street-4, New Work" />
                </calculatorStyle.CustomerDataInfo>
              </calculatorStyle.CustomerHeader>
              <calculatorStyle.CustomerBasicInfo>
                <calculatorStyle.CustomerDataInfo>
                  <p>Work Phone</p>
                  <calculatorStyle.InputCommon value="1234567890" />
                </calculatorStyle.CustomerDataInfo>
                <calculatorStyle.CustomerDataInfo>
                  <p>E-Mail:</p>
                  <calculatorStyle.InputCommon value="a@gmail.com" />
                </calculatorStyle.CustomerDataInfo>
                <calculatorStyle.CustomerDataInfo>
                  <p>Cell Phone:</p>
                  <calculatorStyle.InputCommon value="(404)791-9456" />
                </calculatorStyle.CustomerDataInfo>
              </calculatorStyle.CustomerBasicInfo>
            </calculatorStyle.CustomerDetailsInfo>
          </calculatorStyle.CustomerDetails>
        </calculatorStyle.CustomerInfo>

        {/* MiddleRow as CarInfo*/}

        <calculatorStyle.CarInfo>
          <calculatorStyle.CarType>
            <p>VEHICLE</p>
          </calculatorStyle.CarType>
          <calculatorStyle.CarDetails>
            <calculatorStyle.CarDetailHeader>
              Stock #:<calculatorStyle.SpanCommon>N847488H</calculatorStyle.SpanCommon>
            </calculatorStyle.CarDetailHeader>
            <calculatorStyle.CarDetailHeader>
              New/Used:<calculatorStyle.SpanCommon>Used</calculatorStyle.SpanCommon>
            </calculatorStyle.CarDetailHeader>
            <calculatorStyle.CarDetailHeader>
              VIN:<calculatorStyle.SpanCommon>7BHDOH8KUGBDJKD</calculatorStyle.SpanCommon>
            </calculatorStyle.CarDetailHeader>
            <calculatorStyle.CarDetailHeader>
              Mileage:<calculatorStyle.SpanCommon>54</calculatorStyle.SpanCommon>
            </calculatorStyle.CarDetailHeader>
          </calculatorStyle.CarDetails>
          <calculatorStyle.CarBasicInfo>
            <calculatorStyle.CarBasicInfoHeader>
              Vehicle:<calculatorStyle.SpanCommon>2023 Rivian R1S</calculatorStyle.SpanCommon>
            </calculatorStyle.CarBasicInfoHeader>
            <calculatorStyle.CarBasicInfoHeader>
              Color:<calculatorStyle.SpanCommon>Launch Green</calculatorStyle.SpanCommon>
            </calculatorStyle.CarBasicInfoHeader>
          </calculatorStyle.CarBasicInfo>
          <calculatorStyle.CarTypeInfo>
            <p>
              Type:
              <calculatorStyle.SpanCommon>
                Launch Edition All-Wheel Drive Spor
              </calculatorStyle.SpanCommon>
            </p>
          </calculatorStyle.CarTypeInfo>
        </calculatorStyle.CarInfo>

        {/* Calculator */}
        <calculatorStyle.CalculatorWrapper>
          <calculatorStyle.Table>
            <thead>
              <tr style={{ borderBottom: '1px solid' }}>
                <td style={{ padding: '10px' }}>Load Payments</td>
                <td style={{ padding: '10px' }}>Estimated</td>
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
            Monthly Payment: ${calculatePayment('60')}{' '}
            {/* Display the calculated payment for a specific term */}
          </calculatorStyle.Result>
        </calculatorStyle.CalculatorWrapper>
      </div>
    </>
  );
};

export default LoanPaymentMatrix;
