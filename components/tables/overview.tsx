'use client';

import React from 'react';
import styled from 'styled-components';
import { CompanyData } from '@/types/stocks';
import { formatCurrency, formatPercentage, formatNumber, formatDate } from '@/utils/formatters';

const TableContainer = styled.div`
  font-family: inherit, sans-serif;
  width: 100%;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  width: 60%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableCell = styled.td`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const SectionHeader = styled.h3`
  font-family: inherit, sans-serif;
  font-weight: 700;
  font-size: 1.2em;
  margin: 24px 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 8px;
`;

interface OverviewTableProps {
  companyData: CompanyData;
}

const OverviewTable: React.FC<OverviewTableProps> = ({ companyData }) => {
  const { statistics, earnings, dividends, priceHistory } = companyData;
  
  const keyStats = statistics?.key_statistics;
  const growthValuation = statistics?.growth_valuation;
  const earningsEvents = earnings?.events;
  const dividendEvents = dividends?.events;
  
  const latestHistory = priceHistory?.history?.[priceHistory.history.length - 1];
  
  const currentDate = formatDate(new Date());
  
  const date = currentDate;
  const close = keyStats?.current_price || '--';
  const open = keyStats?.open ? formatCurrency(keyStats.open, keyStats.currency) : '--';
  const high = keyStats?.high ? formatCurrency(keyStats.high, keyStats.currency) : '--';
  const low = keyStats?.low ? formatCurrency(keyStats.low, keyStats.currency) : '--';
  const volume = keyStats?.volume ? formatNumber(keyStats.volume) : '--';
  const previousClose = keyStats?.close ? formatCurrency(keyStats.close, keyStats.currency) : '--';
  
  const bid = keyStats?.bid_price && keyStats?.bid_size ? 
    `${keyStats.bid_price} x ${keyStats.bid_size}` : '--';
  
  const ask = keyStats?.ask_price && keyStats?.ask_size ? 
    `${keyStats.ask_price} x ${keyStats.ask_size}` : '--';
  
  const daysRange = keyStats?.low && keyStats?.high ? 
    `${keyStats.low} - ${keyStats.high}` : '--';
  
  const week52Range = keyStats?.fifty_two_week_low && keyStats?.fifty_two_week_high ? 
    `${keyStats.fifty_two_week_low} - ${keyStats.fifty_two_week_high}` : '--';
  
  const avgVolume = keyStats?.volume ? formatNumber(keyStats.volume) : '--';
  
  const marketCapFromGrowth = growthValuation?.market_capitalization;
  const marketCapFromHistory = latestHistory?.market_capitalization;
  const marketCap = marketCapFromGrowth || marketCapFromHistory || '--';
  const formattedMarketCap = marketCap !== '--' ? formatCurrency(marketCap, keyStats?.currency || 'GHS') : '--';
  
  const beta = '--';
  
  const peRatioFromGrowth = growthValuation?.price_earning_ratio;
  const peRatioFromHistory = latestHistory?.price_earning_ratio;
  const peRatio = peRatioFromGrowth || peRatioFromHistory || '--';
  const formattedPeRatio = peRatio !== '--' ? peRatio.toFixed(2) : '--';
  
  const eps = keyStats?.earnings_per_share ? 
    formatCurrency(keyStats.earnings_per_share, keyStats.currency) : '--';
  
  const earningsDate = earningsEvents?.next_earnings_date ? 
    formatDate(new Date(earningsEvents.next_earnings_date)) : '--';
  
  const forwardDividendYield = keyStats?.dividend_yield ? 
    formatPercentage(keyStats.dividend_yield) : '--';
  
  const exDividendDate = dividendEvents?.next_dividend_pay_date ? 
    formatDate(new Date(dividendEvents.next_dividend_pay_date)) : '--';

  return (
    <TableContainer>
      <SectionHeader>Stock Overview</SectionHeader>
      
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableCell>{date}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Close</TableHeader>
            <TableCell>{close}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Open</TableHeader>
            <TableCell>{open}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>High</TableHeader>
            <TableCell>{high}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Low</TableHeader>
            <TableCell>{low}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Volume</TableHeader>
            <TableCell>{volume}</TableCell>
          </TableRow>
        </tbody>
      </Table>

      <SectionHeader>Key Statistics</SectionHeader>
      
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Previous Close</TableHeader>
            <TableCell>{previousClose}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Bid</TableHeader>
            <TableCell>{bid}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Ask</TableHeader>
            <TableCell>{ask}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Day&apos;s Range</TableHeader>
            <TableCell>{daysRange}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>52 Week Range</TableHeader>
            <TableCell>{week52Range}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Volume</TableHeader>
            <TableCell>{volume}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Avg. Volume</TableHeader>
            <TableCell>{avgVolume}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Market Cap</TableHeader>
            <TableCell>{formattedMarketCap}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Beta (5Y Monthly)</TableHeader>
            <TableCell>{beta}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>PE Ratio (TTM)</TableHeader>
            <TableCell>{formattedPeRatio}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>EPS (TTM)</TableHeader>
            <TableCell>{eps}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Earnings Date</TableHeader>
            <TableCell>{earningsDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Forward Dividend & Yield</TableHeader>
            <TableCell>{forwardDividendYield}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Ex-Dividend Date</TableHeader>
            <TableCell>{exDividendDate}</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default OverviewTable;