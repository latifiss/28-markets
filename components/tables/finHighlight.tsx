'use client';

import React from 'react';
import styled from 'styled-components';
import { CompanyData } from '@/types/stocks';
import { formatPercentage, formatCurrency, formatNumber } from '@/utils/formatters';

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
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  padding-bottom: 8px;
`;

interface FinHighlightProps {
  companyData: CompanyData;
}

const FinHighlight: React.FC<FinHighlightProps> = ({ companyData }) => {
  const { financial, statistics } = companyData;
  
  const financialSummary = financial?.financial_summary;
  const keyStats = statistics?.key_statistics;
  
  const profitMargin = financialSummary?.profit_margin ? 
    formatPercentage(financialSummary.profit_margin) : '--';
  
  const returnOnAssets = financialSummary?.roa ? 
    formatPercentage(financialSummary.roa) : '--';
  
  const returnOnEquity = financialSummary?.roe ? 
    formatPercentage(financialSummary.roe) : '--';
  
  const revenue = financialSummary?.latest_revenue ? 
    formatCurrency(financialSummary.latest_revenue, financial?.financial_summary?.as_of_date ? 'GHS' : 'GHS') : '--';
  
  const netIncome = financialSummary?.latest_net_income ? 
    formatCurrency(financialSummary.latest_net_income, financial?.financial_summary?.as_of_date ? 'GHS' : 'GHS') : '--';
  
  const dilutedEPS = keyStats?.earnings_per_share ? 
    formatCurrency(keyStats.earnings_per_share, keyStats.currency) : '--';
  
  const totalCash = financialSummary?.total_assets ? 
    formatCurrency(financialSummary.total_assets, financial?.financial_summary?.as_of_date ? 'GHS' : 'GHS') : '--';
  
  const totalDebtEquity = financialSummary?.total_debt && financialSummary.total_assets ? 
    `${((financialSummary.total_debt / financialSummary.total_assets) * 100).toFixed(2)}%` : '--';
  
  const leveredFreeCashFlow = financial?.financial_statements?.[0]?.free_cash_flow ? 
    formatCurrency(financial.financial_statements[0].free_cash_flow, financial.financial_statements[0].currency) : '--';

  return (
    <TableContainer>
      <SectionHeader>Profitability and Income Statement</SectionHeader>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Profit Margin</TableHeader>
            <TableCell>{profitMargin}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Return on Assets (ttm)</TableHeader>
            <TableCell>{returnOnAssets}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Return on Equity (ttm)</TableHeader>
            <TableCell>{returnOnEquity}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Revenue (ttm)</TableHeader>
            <TableCell>{revenue}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Net Income Available to Common (ttm)</TableHeader>
            <TableCell>{netIncome}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Diluted EPS (ttm)</TableHeader>
            <TableCell>{dilutedEPS}</TableCell>
          </TableRow>
        </tbody>
      </Table>

      <SectionHeader>Balance Sheet and Cash Flow</SectionHeader>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Total Cash (mrq)</TableHeader>
            <TableCell>{totalCash}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Total Debt/Equity (mrq)</TableHeader>
            <TableCell>{totalDebtEquity}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeader>Levered Free Cash Flow (ttm)</TableHeader>
            <TableCell>{leveredFreeCashFlow}</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default FinHighlight;