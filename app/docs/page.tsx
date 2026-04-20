"use client";

import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Proxima Nova', sans-serif;
`;

const Main = styled.main`
  flex: 1;
  padding: 60px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

const Title = styled.h1`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  border-bottom: 3px solid ${({ theme }) => theme.colors.select || "#2e7d32"};
  padding-bottom: 16px;
  display: inline-block;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 32px 0 16px 0;
  letter-spacing: -0.01em;
`;

const SubSectionTitle = styled.h3`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 24px 0 12px 0;
`;

const Paragraph = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  margin-bottom: 16px;
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.boxBg || "#f5f5f5"};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
  word-break: break-word;
`;

const InlineCode = styled.code`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.boxBg || "#f5f5f5"};
  padding: 2px 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.select || "#2e7d32"};
`;

const EndpointTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 14px;

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 12px;
    text-align: left;
    vertical-align: top;
    font-family: 'Proxima Nova', sans-serif;
  }

  th {
    background: ${({ theme }) => theme.colors.boxBg || "#f5f5f5"};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    color: ${({ theme }) => theme.colors.grayText || "#666"};
  }

  code {
    font-family: 'Proxima Nova', sans-serif;
    font-size: 13px;
    background: none;
    padding: 0;
  }
`;

const MethodBadge = styled.span<{ method: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Proxima Nova', sans-serif;
  background: ${({ method, theme }) => {
    switch(method) {
      case 'GET': return theme.colors.select || '#2e7d32';
      default: return theme.colors.border;
    }
  }};
  color: white;
  margin-right: 8px;
`;

const BaseUrlBox = styled.div`
  background: ${({ theme }) => theme.colors.boxBg || "#f0faf0"};
  border: 2px solid ${({ theme }) => theme.colors.select || "#2e7d32"};
  padding: 20px;
  margin: 24px 0;
  text-align: center;
  font-family: 'Proxima Nova', sans-serif;
`;

const BaseUrlStrong = styled.strong`
  color: ${({ theme }) => theme.colors.select || "#2e7d32"};
  font-family: 'Proxima Nova', sans-serif;
`;

const BaseUrlCode = styled.code`
  margin-left: 8px;
  font-family: 'Proxima Nova', sans-serif;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
`;

const NoteBox = styled.div`
  background: ${({ theme }) => theme.colors.boxBg || "#f5f5f5"};
  border-left: 4px solid ${({ theme }) => theme.colors.select || "#2e7d32"};
  padding: 16px;
  margin: 20px 0;
  border-radius: 4px;
  font-family: 'Proxima Nova', sans-serif;
`;

const NoteBoxStrong = styled.strong`
  font-family: 'Proxima Nova', sans-serif;
`;

const NoteBoxParagraph = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
`;

export default function FinancialDocsPage() {
  return (
    <PageWrapper>
      <Main>
        <Title>Documentation</Title>
        
        <Paragraph>
          Welcome to the API documentation - your comprehensive source for real-time and historical 
          financial market data. Our API provides access to commodities, currencies, forex rates, treasury yields, stock prices, and global market indexes.
        </Paragraph>

        <BaseUrlBox>
          <BaseUrlStrong>Base URL:</BaseUrlStrong>
          <BaseUrlCode>https://api.financialdata.com/api/v1</BaseUrlCode>
        </BaseUrlBox>

        {/* Commodities Section */}
        <Section>
          <SectionTitle>Commodities</SectionTitle>
          <Paragraph>
            Access real-time and historical commodity prices including gold, silver, oil, natural gas, copper, and agricultural products.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodities</InlineCode></td>
                <td>Get all commodities with their current prices</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodities/:code</InlineCode></td>
                <td>Get a specific commodity by its code</td>
                <td><InlineCode>code</InlineCode> - Commodity code (e.g., GOLD, SILVER, OIL)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodities/:code/history</InlineCode></td>
                <td>Get complete price history for a commodity</td>
                <td><InlineCode>code</InlineCode> - Commodity code</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodities/:code/history/period/:period</InlineCode></td>
                <td>Get price history for a specific time period</td>
                <td><InlineCode>code</InlineCode> - Commodity code<br/>
                <InlineCode>period</InlineCode> - Time period (e.g., 1d, 1w, 1m, 3m, 6m, 1y)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodities/:code/history/latest</InlineCode></td>
                <td>Get the latest price entry for a commodity</td>
                <td><InlineCode>code</InlineCode> - Commodity code</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "code": "GOLD",
    "name": "Gold",
    "current_price": 2150.45,
    "change": 12.30,
    "change_percent": 0.58,
    "previous_close": 2138.15,
    "high_24h": 2155.20,
    "low_24h": 2135.80,
    "volume": 15234000,
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Forex Section */}
        <Section>
          <SectionTitle>Currencies (Forex)</SectionTitle>
          <Paragraph>
            Live and historical foreign exchange rates for major and minor currency pairs.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex</InlineCode></td>
                <td>Get all forex currency pairs with current rates</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/:code</InlineCode></td>
                <td>Get a specific forex pair by its code</td>
                <td><InlineCode>code</InlineCode> - Currency pair (e.g., EURUSD, GBPUSD, USDJPY)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/:code/history</InlineCode></td>
                <td>Get complete exchange rate history for a currency pair</td>
                <td><InlineCode>code</InlineCode> - Currency pair code</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/:code/history/period/:period</InlineCode></td>
                <td>Get exchange rate history for a specific time period</td>
                <td><InlineCode>code</InlineCode> - Currency pair code<br/>
                <InlineCode>period</InlineCode> - Time period (e.g., 1d, 1w, 1m, 3m, 6m, 1y)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/:code/history/latest</InlineCode></td>
                <td>Get the latest exchange rate entry for a currency pair</td>
                <td><InlineCode>code</InlineCode> - Currency pair code</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "code": "EURUSD",
    "name": "Euro / US Dollar",
    "bid": 1.0892,
    "ask": 1.0895,
    "spread": 0.0003,
    "change": 0.0021,
    "change_percent": 0.19,
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Interbank Forex Section */}
        <Section>
          <SectionTitle>Interbank Forex (Bank of Ghana Rates)</SectionTitle>
          <Paragraph>
            Average exchange rates between banks provided by the Bank of Ghana. These represent the interbank market rates.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/interbank-pairs</InlineCode></td>
                <td>Get all interbank currency pairs</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/interbank-pairs/:id</InlineCode></td>
                <td>Get an interbank pair by its database ID</td>
                <td><InlineCode>id</InlineCode> - Database ID of the interbank pair</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/interbank-pairs/code/:code</InlineCode></td>
                <td>Get an interbank pair by currency code</td>
                <td><InlineCode>code</InlineCode> - Currency code (e.g., USD, EUR, GBP)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/interbank-pairs/bank/:bankCode</InlineCode></td>
                <td>Get interbank rates for a specific bank</td>
                <td><InlineCode>bankCode</InlineCode> - Bank identifier code</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/interbank-pairs/:id/history</InlineCode></td>
                <td>Get price history for an interbank pair</td>
                <td><InlineCode>id</InlineCode> - Interbank pair ID</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/price-history/:bankCode/period/:period</InlineCode></td>
                <td>Get price history for a bank over a specific period</td>
                <td><InlineCode>bankCode</InlineCode> - Bank code<br/>
                <InlineCode>period</InlineCode> - Time period (e.g., 1d, 1w, 1m)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/price-history/:bankCode/latest</InlineCode></td>
                <td>Get the latest price history entry for a bank</td>
                <td><InlineCode>bankCode</InlineCode> - Bank code</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "code": "USD",
    "bank_code": "BOG",
    "bid_rate": 12.45,
    "ask_rate": 12.50,
    "mid_rate": 12.475,
    "change": 0.05,
    "change_percent": 0.40,
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Indexes Section */}
        <Section>
          <SectionTitle>Market Indexes</SectionTitle>
          <Paragraph>
            Major global market indexes including FTSE 100, GSE Composite, S&P 500, Dow Jones, NASDAQ, DAX, and Nikkei.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/indices</InlineCode></td>
                <td>Get all market indexes with current values</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/indices/:code</InlineCode></td>
                <td>Get a specific index by its code</td>
                <td><InlineCode>code</InlineCode> - Index code (e.g., FTSE100, GSE, SPX)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/indices/:code/history</InlineCode></td>
                <td>Get historical data for a specific index</td>
                <td><InlineCode>code</InlineCode> - Index code</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "code": "GSE",
    "name": "Ghana Stock Exchange Composite Index",
    "value": 3450.25,
    "change": 15.50,
    "change_percent": 0.45,
    "previous_close": 3434.75,
    "high_52week": 3600.00,
    "low_52week": 3200.50,
    "updated_at": "2024-01-15T16:00:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Stocks / Equity Section */}
        <Section>
          <SectionTitle>Stocks & Equity</SectionTitle>
          <Paragraph>
            Comprehensive stock market data including company profiles, statistics, dividends, earnings, financials, and price history.
          </Paragraph>
          
          <SubSectionTitle>Company Information Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/profiles/:company_id</InlineCode></td>
                <td>Get company profile information</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/statistics/:company_id</InlineCode></td>
                <td>Get company statistics (P/E ratio, market cap, etc.)</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/dividends/:company_id</InlineCode></td>
                <td>Get dividend history for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/earnings/:company_id</InlineCode></td>
                <td>Get earnings reports for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/financial/:company_id</InlineCode></td>
                <td>Get financial statements for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/holders/:company_id</InlineCode></td>
                <td>Get institutional and insider holdings</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/company/:company_id/all</InlineCode></td>
                <td>Get all data for a company in one request</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Price History Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id</InlineCode></td>
                <td>Get complete price history for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/24h</InlineCode></td>
                <td>Get price history for last 24 hours</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/1w</InlineCode></td>
                <td>Get price history for last week</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/3m</InlineCode></td>
                <td>Get price history for last 3 months</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/6m</InlineCode></td>
                <td>Get price history for last 6 months</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/ytd</InlineCode></td>
                <td>Get price history from year to date</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/1y</InlineCode></td>
                <td>Get price history for last year</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/2y</InlineCode></td>
                <td>Get price history for last 2 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/5y</InlineCode></td>
                <td>Get price history for last 5 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/10y</InlineCode></td>
                <td>Get price history for last 10 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/price-history/:company_id/all</InlineCode></td>
                <td>Get all-time price history</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Market Analysis Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/exchange/:exchangeSymbol/top-gainers</InlineCode></td>
                <td>Get top gaining stocks on an exchange</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol (e.g., GSE, NYSE, NASDAQ)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/exchange/:exchangeSymbol/top-losers</InlineCode></td>
                <td>Get top losing stocks on an exchange</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/exchange/:exchangeSymbol/performance-by-industry</InlineCode></td>
                <td>Get performance metrics grouped by industry</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/exchange/:exchangeSymbol/market-movers</InlineCode></td>
                <td>Get stocks with highest volume and activity</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/equity/gse/status</InlineCode></td>
                <td>Get current market status for GSE</td>
                <td>None</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "company_id": "MTNGH",
    "name": "MTN Ghana",
    "current_price": 1.45,
    "change": 0.03,
    "change_percent": 2.11,
    "volume": 2500000,
    "market_cap": 2450000000,
    "pe_ratio": 12.5,
    "dividend_yield": 6.8,
    "updated_at": "2024-01-15T16:00:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Treasury Section */}
        <Section>
          <SectionTitle>Treasury Bonds</SectionTitle>
          <Paragraph>
            Government bond yields, treasury bills, notes, bonds, and yield curve data.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/treasury</InlineCode></td>
                <td>Get all treasury bonds and bills</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/treasury/active</InlineCode></td>
                <td>Get currently active treasury bonds</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/treasury/highest-yielding</InlineCode></td>
                <td>Get bonds with the highest yields</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/treasury/:id</InlineCode></td>
                <td>Get a specific treasury bond by ID</td>
                <td><InlineCode>id</InlineCode> - Treasury bond identifier</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "id": "TB-2024-001",
    "name": "Government of Ghana 5-Year Bond",
    "face_value": 1000,
    "coupon_rate": 14.5,
    "yield_to_maturity": 15.2,
    "maturity_date": "2029-01-15",
    "issue_date": "2024-01-15",
    "days_to_maturity": 1825,
    "current_price": 985.50,
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`}</CodeBlock>
        </Section>

        <NoteBox>
          <NoteBoxStrong>📝 Note:</NoteBoxStrong>
          <NoteBoxParagraph>
            All GET endpoints accept an optional <InlineCode>?api_key=YOUR_API_KEY</InlineCode> query parameter or you can include it in the request headers as <InlineCode>X-API-Key</InlineCode>. Rate limits apply based on your subscription tier.
          </NoteBoxParagraph>
        </NoteBox>
      </Main>
    </PageWrapper>
  );
}