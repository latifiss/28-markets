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
  font-family: 'Proxima Nova', sans-serif;
`;

const NoteBoxStrong = styled.strong`
  font-family: 'Proxima Nova', sans-serif;
  color: ${({ theme }) => theme.colors.text};
`;

const NoteBoxParagraph = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
`;

const Button = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.select || "#2e7d32"};
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 8px;
  font-family: 'Proxima Nova', sans-serif;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

export default function FinancialDocsPage() {
  return (
    <PageWrapper>
      <Main>
        <Title>Documentation</Title>
        
        <Paragraph>
          Welcome to the API documentation - your comprehensive source for real-time and historical 
          financial market data. Our API provides access to commodities, cryptocurrencies, forex rates, stock prices, and global market indexes.
        </Paragraph>

        <BaseUrlBox>
          <BaseUrlStrong>Base URL:</BaseUrlStrong>
          <BaseUrlCode>https://api.28-markets.com/api</BaseUrlCode>
        </BaseUrlBox>

        {/* Authentication Section */}
        <Section>
          <SectionTitle>Authentication</SectionTitle>
          <Paragraph>
            All API endpoints require a valid API key for authentication. You can obtain your API key by subscribing to a plan on our <a href="/pricing" style={{ color: "#2e7d32", textDecoration: "underline" }}>Pricing page</a>. Once you have your API key, you can include it in your requests in two ways:
          </Paragraph>
          
          <SubSectionTitle>Method</SubSectionTitle>
          <CodeBlock>{`
fetch('https://api.28-markets.com/api/commodity/', {
  headers: {
    'X-API-Key': 'your_api_key_here'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}</CodeBlock>

          <SubSectionTitle>cURL Example</SubSectionTitle>
          <CodeBlock>{`
curl -X GET "https://api.28-markets.com/api/commodity/" \\
  -H "X-API-Key: your_api_key_here"

# Get specific commodity
curl -X GET "https://api.28-markets.com/api/commodity/GOLD" \\
  -H "X-API-Key: your_api_key_here"`}</CodeBlock>

          <NoteBox>
            <NoteBoxStrong>💡 Get Your API Key:</NoteBoxStrong>
            <NoteBoxParagraph>
              Visit our <a href="/pricing" style={{ color: "#2e7d32", textDecoration: "underline" }}>Pricing page</a> to subscribe to a plan and get your unique API key immediately.
            </NoteBoxParagraph>
            <div style={{ marginTop: "12px" }}>
              <Button href="/pricing">Get API Key →</Button>
            </div>
          </NoteBox>
        </Section>

        {/* Commodities Section */}
        <Section>
          <SectionTitle>Commodities</SectionTitle>
          <Paragraph>
            Access real-time and historical commodity prices including gold, silver, oil, natural gas, copper, and agricultural products.
            All endpoints require API key authentication and are rate-limited.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodity/</InlineCode></td>
                <td>Get all commodities with their current prices</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodity/:code</InlineCode></td>
                <td>Get a specific commodity by its code</td>
                <td><InlineCode>code</InlineCode> - Commodity code (e.g., GOLD, SILVER, OIL)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodity/:code/history</InlineCode></td>
                <td>Get complete price history for a commodity</td>
                <td><InlineCode>code</InlineCode> - Commodity code</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodity/:code/history/period/:period</InlineCode></td>
                <td>Get price history for a specific time period</td>
                <td><InlineCode>code</InlineCode> - Commodity code<br/>
                <InlineCode>period</InlineCode> - Time period (e.g., 1d, 1w, 1m, 3m, 6m, 1y)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/commodity/:code/history/latest</InlineCode></td>
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

        {/* Cryptocurrencies Section */}
        <Section>
          <SectionTitle>Cryptocurrencies</SectionTitle>
          <Paragraph>
            Live and historical cryptocurrency data including prices, market caps, volume, and comprehensive market analysis.
            All endpoints require API key authentication and are rate-limited.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/</InlineCode></td>
                <td>Get all cryptocurrencies with current prices</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/symbol/:symbol</InlineCode></td>
                <td>Get a specific cryptocurrency by symbol</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol (e.g., BTC, ETH, SOL)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/id/:id</InlineCode></td>
                <td>Get a specific cryptocurrency by database ID</td>
                <td><InlineCode>id</InlineCode> - Database ID</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/:symbol/history</InlineCode></td>
                <td>Get price history for a cryptocurrency</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/:symbol/comprehensive</InlineCode></td>
                <td>Get comprehensive data for a cryptocurrency</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coingainers</InlineCode></td>
                <td>Get all coin gainers</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coingainers/top</InlineCode></td>
                <td>Get top gaining cryptocurrencies</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coingainers/losers</InlineCode></td>
                <td>Get top losing cryptocurrencies</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coingainers/:symbol</InlineCode></td>
                <td>Get a specific coin gainer by symbol</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coinlosers</InlineCode></td>
                <td>Get all coin losers</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coinlosers/top</InlineCode></td>
                <td>Get top losing cryptocurrencies</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coinlosers/:symbol</InlineCode></td>
                <td>Get a specific coin loser by symbol</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coin-history</InlineCode></td>
                <td>Get all coin history records</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coin-history/:symbol</InlineCode></td>
                <td>Get coin history for a specific symbol</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/crypto/coin/coin-history/:symbol/stats</InlineCode></td>
                <td>Get statistics for a coin's history</td>
                <td><InlineCode>symbol</InlineCode> - Crypto symbol</td>
              </tr>
            </tbody>
          </EndpointTable>

          <SubSectionTitle>Example Response</SubSectionTitle>
          <CodeBlock>{`{
  "status": "success",
  "data": {
    "symbol": "BTC",
    "name": "Bitcoin",
    "current_price": 43250.75,
    "change_24h": 1250.30,
    "change_percent_24h": 2.98,
    "market_cap": 850000000000,
    "volume_24h": 25000000000,
    "updated_at": "2024-01-15T14:30:00Z"
  }
}`}</CodeBlock>
        </Section>

        {/* Forex Section */}
        <Section>
          <SectionTitle>Currencies (Forex)</SectionTitle>
          <Paragraph>
            Live and historical foreign exchange rates for major and minor currency pairs.
            All endpoints require API key authentication and are rate-limited.
          </Paragraph>
          
          <SubSectionTitle>Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/currency/</InlineCode></td>
                <td>Get all forex currency pairs with current rates</td>
                <td>None</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/currency/:code</InlineCode></td>
                <td>Get a specific forex pair by its code</td>
                <td><InlineCode>code</InlineCode> - Currency pair (e.g., EURUSD, GBPUSD, USDJPY)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/currency/:code/history</InlineCode></td>
                <td>Get complete exchange rate history for a currency pair</td>
                <td><InlineCode>code</InlineCode> - Currency pair code</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/currency/:code/history/period/:period</InlineCode></td>
                <td>Get exchange rate history for a specific time period</td>
                <td><InlineCode>code</InlineCode> - Currency pair code<br/>
                <InlineCode>period</InlineCode> - Time period (e.g., 1d, 1w, 1m, 3m, 6m, 1y)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/forex/currency/:code/history/latest</InlineCode></td>
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

        {/* Stocks Section */}
        <Section>
          <SectionTitle>Stocks & Equity</SectionTitle>
          <Paragraph>
            Comprehensive stock market data including company profiles, statistics, dividends, earnings, financials, and price history.
            All endpoints require API key authentication and are rate-limited.
          </Paragraph>
          
          <SubSectionTitle>Company Information Endpoints</SubSectionTitle>
          <EndpointTable>
            <thead>
              <tr><th>Endpoint</th><th>Description</th><th>Parameters</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/profiles/:company_id</InlineCode></td>
                <td>Get company profile information</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/statistics/:company_id</InlineCode></td>
                <td>Get company statistics (P/E ratio, market cap, etc.)</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/dividends/:company_id</InlineCode></td>
                <td>Get dividend history for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/earnings/:company_id</InlineCode></td>
                <td>Get earnings reports for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/financial/:company_id</InlineCode></td>
                <td>Get financial statements for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/holders/:company_id</InlineCode></td>
                <td>Get institutional and insider holdings</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/company/:company_id/all</InlineCode></td>
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
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id</InlineCode></td>
                <td>Get complete price history for a company</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/24h</InlineCode></td>
                <td>Get price history for last 24 hours</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/1w</InlineCode></td>
                <td>Get price history for last week</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/3m</InlineCode></td>
                <td>Get price history for last 3 months</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/6m</InlineCode></td>
                <td>Get price history for last 6 months</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/ytd</InlineCode></td>
                <td>Get price history from year to date</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/1y</InlineCode></td>
                <td>Get price history for last year</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/2y</InlineCode></td>
                <td>Get price history for last 2 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/5y</InlineCode></td>
                <td>Get price history for last 5 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/10y</InlineCode></td>
                <td>Get price history for last 10 years</td>
                <td><InlineCode>company_id</InlineCode> - Company identifier</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/price-history/:company_id/all</InlineCode></td>
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
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/exchange/:exchangeSymbol/top-gainers</InlineCode></td>
                <td>Get top gaining stocks on an exchange</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol (e.g., GSE, NYSE, NASDAQ)</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/exchange/:exchangeSymbol/top-losers</InlineCode></td>
                <td>Get top losing stocks on an exchange</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/exchange/:exchangeSymbol/performance-by-industry</InlineCode></td>
                <td>Get performance metrics grouped by industry</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/exchange/:exchangeSymbol/market-movers</InlineCode></td>
                <td>Get stocks with highest volume and activity</td>
                <td><InlineCode>exchangeSymbol</InlineCode> - Exchange symbol</td>
              </tr>
              <tr>
                <td><MethodBadge method="GET">GET</MethodBadge> <InlineCode>/stocks/gse/status</InlineCode></td>
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

        <NoteBox>
          <NoteBoxStrong>🔐 Authentication & Rate Limits:</NoteBoxStrong>
          <NoteBoxParagraph>
            All GET endpoints require API key authentication. You must include your API key in the request headers. Rate limits apply based on your subscription tier. Visit our <a href="/pricing" style={{ color: "#2e7d32", textDecoration: "underline" }}>Pricing page</a> for detailed rate limit information.
          </NoteBoxParagraph>
        </NoteBox>
      </Main>
    </PageWrapper>
  );
}