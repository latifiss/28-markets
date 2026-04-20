'use client';

import React from 'react';
import styled from 'styled-components';
import { CompanyData } from '@/types/stocks';
import { formatPercentage, formatCurrency, formatDate } from '@/utils/formatters';

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

interface DividendTableProps {
  companyData: CompanyData;
}

const DividendTable: React.FC<DividendTableProps> = ({ companyData }) => {
  const { dividends, statistics } = companyData;
  
  const dividendSummary = dividends?.summary;
  const dividendEvents = dividends?.events;
  const keyStats = statistics?.key_statistics;
  
  const totalShareholderYield = dividendSummary?.average_yield_5yr ? 
    formatPercentage(dividendSummary.average_yield_5yr) : '--';
  
  const futureDividendYield = keyStats?.dividend_yield ? 
    formatPercentage(keyStats.dividend_yield) : '--';
  
  const dividendGrowth = dividendEvents?.dividend_growth || '--';
  
  const nextDividendPayDate = dividendEvents?.next_dividend_pay_date ? 
    formatDate(new Date(dividendEvents.next_dividend_pay_date)) : '--';
  
  const exDividendDate = dividends?.dividend_history?.[0]?.ex_dividend_date ? 
    formatDate(new Date(dividends.dividend_history[0].ex_dividend_date)) : '--';
  
  const dividendPerShare = keyStats?.dividend_per_share ? 
    formatCurrency(keyStats.dividend_per_share, keyStats.currency) : '--';
  
  const payoutRatio = keyStats?.dividend_per_share && keyStats?.earnings_per_share && keyStats.earnings_per_share !== 0 ? 
    `${((keyStats.dividend_per_share / keyStats.earnings_per_share) * 100).toFixed(0)}%` : '--';

  return (
    <TableContainer>
      <SectionHeader>Dividend</SectionHeader>
      
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Total Shareholder Yield</TableHeader>
            <TableCell>{totalShareholderYield}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Future Dividend Yield</TableHeader>
            <TableCell>{futureDividendYield}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Dividend Growth</TableHeader>
            <TableCell>{dividendGrowth}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Next dividend pay date</TableHeader>
            <TableCell>{nextDividendPayDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Ex dividend date</TableHeader>
            <TableCell>{exDividendDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Dividend per share</TableHeader>
            <TableCell>{dividendPerShare}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Payout ratio</TableHeader>
            <TableCell>{payoutRatio}</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default DividendTable;