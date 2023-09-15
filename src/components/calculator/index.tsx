import React, { useState, useRef, useEffect } from 'react';
import calculatorStyle from './style.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiClient } from 'adminjs';

const LoanPaymentMatrix = () => {
  const [marketValue, setMarketValue] = useState('0');
  const [taxableFees, setTaxableFees] = useState('0');
  const [docFee, setDocFee] = useState('0');
  const [gatavt, setGatavt] = useState('0');
  const [nontaxFees, setNontaxFees] = useState('0');
  const [apr, setApr] = useState('0');
  const container = useRef(null);
  const [total, setTotal] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [limit] = React.useState(10);
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiURI, setApiURI] = React.useState('');
  const api = new ApiClient();

  React.useEffect(() => {
    setLoading(true);
    api
      .getDashboard()
      .then((response: any) => {
        if (response?.data?.apiURI) {
          setApiURI(response.data.apiURI);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(window.location.search);
      const opportunityId = queryParams.get('id');
      if (opportunityId) {
        try {
          setLoading(true);
          const response = await fetch(
            `${apiURI}/desklogs` + '?offset=' + offset + '&limit=' + limit,
          );
          const data = await response.json();
          if (data?.items?.length) {
            const { items } = data;
            const opportunityData = items.find((item: any) => item.id === opportunityId);
            setOpportunity(opportunityData);
          }
          if (data?.total) {
            setTotal(data?.total);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [offset, limit, apiURI]);

  const handlePDFDownload = async () => {
    if (container.current) {
      const html2canvasInstance: any = html2canvas;
      html2canvasInstance(container.current).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
        pdf.save(`${opportunity?.customer?.name}.pdf`);
      });
    }
  };

  return (
    <>
      <button
        style={{
          width: 'max-content',
          display: 'flex',
          alignSelf: 'flex-end',
          margin: '10px 20px 5px',
          cursor: 'pointer',
        }}
        onClick={handlePDFDownload}
      >
        Download PDF
      </button>
      {loading ? (
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
          }}
        >
          Loading...
        </div>
      ) : (
        <div className="calculator-container" style={{ padding: 16 }}>
          <div
            id="pdf-container"
            ref={container}
            style={{
              width: 'calc(100% - 20px)',
              color: 'black',
              backgroundColor: 'white',
              height: '100vh',
            }}
          >
            <calculatorStyle.CompanyInfo>
              <calculatorStyle.CompanyDetails style={{ width: '60%' }}>
                <calculatorStyle.CompanyBasicInfo>
                  {/* <calculatorStyle.CompanyTitle></calculatorStyle.CompanyTitle> */}
                  <calculatorStyle.CompanyName>
                    <span style={{ fontWeight: 900 }}>Stone Mountain Toyota</span>
                  </calculatorStyle.CompanyName>
                  <calculatorStyle.CompanyDescription>
                    2023 Premier Dealer
                  </calculatorStyle.CompanyDescription>
                </calculatorStyle.CompanyBasicInfo>
              </calculatorStyle.CompanyDetails>
              <calculatorStyle.CompanyDetails style={{ width: '40%' }}>
                <calculatorStyle.CompanyEmployeeInfo>
                  <h4 style={{ fontSize: '16px', width: '110px' }}>Date:</h4>
                  <calculatorStyle.InputCommon
                    value="1/02/2023"
                    style={{
                      flexGrow: 1,
                      marginRight: '16px',
                    }}
                  />
                </calculatorStyle.CompanyEmployeeInfo>
                <calculatorStyle.CompanyEmployeeInfo>
                  <h4 style={{ fontSize: '16px', width: '110px' }}>Sales Person:</h4>
                  <calculatorStyle.InputCommon
                    style={{
                      flexGrow: 1,
                      marginRight: '16px',
                    }}
                    name=""
                    value={opportunity?.salesRep?.name}
                    onChange={(e) => e.target.value}
                  />
                </calculatorStyle.CompanyEmployeeInfo>
                <calculatorStyle.CompanyEmployeeInfo>
                  <h4 style={{ fontSize: '16px', width: '110px' }}>Manager:</h4>
                  <calculatorStyle.InputCommon
                    value="Rakesh Sharma"
                    style={{
                      flexGrow: 1,
                      marginRight: '16px',
                    }}
                  />
                </calculatorStyle.CompanyEmployeeInfo>
              </calculatorStyle.CompanyDetails>
            </calculatorStyle.CompanyInfo>

            {/* HeaderBottom as Customer Info */}

            <calculatorStyle.CustomerInfo>
              <calculatorStyle.CustomerInfoType>
                FOR INTERNAL USE ONLY
              </calculatorStyle.CustomerInfoType>
              <calculatorStyle.CustomerDetails>
                <calculatorStyle.CustomerDetailsInfo>
                  <calculatorStyle.CustomerHeader>
                    <calculatorStyle.CustomerDataInfo>
                      <h1 style={{ fontSize: 18, fontWeight: 500, marginRight: '50px' }}>
                        CUSTOMER
                      </h1>
                      <calculatorStyle.InputCommon
                        style={{ width: '100%' }}
                        value={opportunity?.customer?.name}
                      />
                    </calculatorStyle.CustomerDataInfo>

                    <calculatorStyle.CustomerDataInfo>
                      <p>Address:</p>
                      <calculatorStyle.InputCommon
                        style={{ width: '100%' }}
                        value={opportunity?.customer?.address}
                      />
                    </calculatorStyle.CustomerDataInfo>
                    <calculatorStyle.CustomerDataInfo>
                      <p style={{ width: '55px' }}>E-Mail:</p>
                      <calculatorStyle.InputCommon
                        style={{ width: '100%' }}
                        value={opportunity?.customer?.email}
                      />
                    </calculatorStyle.CustomerDataInfo>
                  </calculatorStyle.CustomerHeader>
                  <calculatorStyle.CustomerBasicInfo>
                    <calculatorStyle.CustomerDataInfo>
                      <p>Home Phone:</p>
                      <calculatorStyle.InputCommon value={opportunity?.customer?.homeNumber} />
                    </calculatorStyle.CustomerDataInfo>
                    <calculatorStyle.CustomerDataInfo>
                      <p>Work Phone:</p>
                      <calculatorStyle.InputCommon value={opportunity?.customer?.workNumber} />
                    </calculatorStyle.CustomerDataInfo>

                    <calculatorStyle.CustomerDataInfo>
                      <p>Cell Phone:</p>
                      <calculatorStyle.InputCommon value={opportunity?.customer?.cellNumber} />
                    </calculatorStyle.CustomerDataInfo>
                  </calculatorStyle.CustomerBasicInfo>
                </calculatorStyle.CustomerDetailsInfo>
              </calculatorStyle.CustomerDetails>
            </calculatorStyle.CustomerInfo>

            {/* MiddleRow as CarInfo*/}

            <calculatorStyle.CarInfo>
              <calculatorStyle.CarType>
                <h1 style={{ fontSize: 18, fontWeight: 500, marginRight: '50px' }}>VEHICLE</h1>
              </calculatorStyle.CarType>
              <calculatorStyle.CarDetails>
                <calculatorStyle.CarDetailHeader>
                  Stock #:<calculatorStyle.SpanCommon> N847488H</calculatorStyle.SpanCommon>
                </calculatorStyle.CarDetailHeader>
                <calculatorStyle.CarDetailHeader>
                  New/Used:<calculatorStyle.SpanCommon> Used</calculatorStyle.SpanCommon>
                </calculatorStyle.CarDetailHeader>
                <calculatorStyle.CarDetailHeader>
                  VIN:
                  <calculatorStyle.SpanCommon>
                    {opportunity?.vehicle?.VIN}
                  </calculatorStyle.SpanCommon>
                </calculatorStyle.CarDetailHeader>
                <calculatorStyle.CarDetailHeader>
                  Mileage:
                  <calculatorStyle.SpanCommon>
                    {opportunity?.vehicle?.mileage}
                  </calculatorStyle.SpanCommon>
                </calculatorStyle.CarDetailHeader>
              </calculatorStyle.CarDetails>
              <calculatorStyle.CarBasicInfo>
                <calculatorStyle.CarBasicInfoHeader>
                  Vehicle:
                  <calculatorStyle.SpanCommon>
                    {opportunity?.vehicle?.model ?? ''} {opportunity?.vehicle?.make ?? ''}
                  </calculatorStyle.SpanCommon>
                </calculatorStyle.CarBasicInfoHeader>
                <calculatorStyle.CarBasicInfoHeader>
                  Color:<calculatorStyle.SpanCommon> Launch Green</calculatorStyle.SpanCommon>
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
                      <calculatorStyle.TableCell>
                        ${calculatePayment(term)}
                      </calculatorStyle.TableCell>
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
        </div>
      )}
    </>
  );
};

export default LoanPaymentMatrix;
