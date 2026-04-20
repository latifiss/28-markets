'use client';

import React from 'react';
import styled from 'styled-components';
import { CompanyData } from '@/types/stocks';
import { formatPercentage, formatNumber } from '@/utils/formatters';

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

const TableHeader = styled.th<{ $align?: string }>`
  text-align: ${props => props.$align || 'left'};
  padding: 12px 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableCell = styled.td`
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const PercentageCell = styled(TableCell)`
  width: 15%;
  font-weight: 600;
`;

const NameCell = styled(TableCell)`
  width: 50%;
`;

const SharesCell = styled(TableCell)`
  width: 35%;
  text-align: right;
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

interface HolderTableProps {
  companyData: CompanyData;
}

const HolderTable: React.FC<HolderTableProps> = ({ companyData }) => {
  const { holders } = companyData;
  
  const ownershipSummary = holders?.ownership_summary;
  
  const sharesHeldByInsiders = ownershipSummary?.percent_shares_held_by_all_insiders ? 
    formatPercentage(ownershipSummary.percent_shares_held_by_all_insiders) : 
    (ownershipSummary?.percent_insiders ? formatPercentage(ownershipSummary.percent_insiders) : '--');
  
  const sharesHeldByInstitutions = ownershipSummary?.percent_shares_held_by_institutions ? 
    formatPercentage(ownershipSummary.percent_shares_held_by_institutions) : 
    (ownershipSummary?.percent_institutions ? formatPercentage(ownershipSummary.percent_institutions) : '--');
  
  const floatHeldByInstitutions = ownershipSummary?.percent_float_held_by_institutions ? 
    formatPercentage(ownershipSummary.percent_float_held_by_institutions) : '--';
  
  const numberOfInstitutions = ownershipSummary?.number_of_institutions ? 
    formatNumber(ownershipSummary.number_of_institutions) : '--';

  return (
    <TableContainer>
      <SectionHeader>Major Holders</SectionHeader>
      
      <Table>
        <tbody>
          <TableRow>
            <TableCell>{sharesHeldByInsiders}</TableCell>
            <TableHeader $align="left">% of Shares Held by All Insiders</TableHeader>
          </TableRow>
          <TableRow>
            <TableCell>{sharesHeldByInstitutions}</TableCell>
            <TableHeader $align="left">% of Shares Held by Institutions</TableHeader>
          </TableRow>
          <TableRow>
            <TableCell>{floatHeldByInstitutions}</TableCell>
            <TableHeader $align="left">% of Float Held by Institutions</TableHeader>
          </TableRow>
          <TableRow>
            <TableCell>{numberOfInstitutions}</TableCell>
            <TableHeader $align="left">Number of Institutions Holding Shares</TableHeader>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default HolderTable;