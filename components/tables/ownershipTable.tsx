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
  text-align: left;
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

interface Owner {
  percentage: string;
  name: string;
  shares: string;
}

interface OwnershipTableProps {
  companyData: CompanyData;
}

const OwnershipTable: React.FC<OwnershipTableProps> = ({ companyData }) => {
  const { holders } = companyData;
  
  const topHolders = holders?.top_institutional_holders || [];
  
  const owners: Owner[] = topHolders.slice(0, 5).map(holder => ({
    percentage: holder.shares_percent ? formatPercentage(holder.shares_percent) : '--',
    name: holder.institution_name || 'Unknown Institution',
    shares: holder.shares_held ? formatNumber(holder.shares_held) : '--'
  }));
  
  const displayOwners = owners.length > 0 ? owners : [
    {
      percentage: '--',
      name: 'No institutional holder data available',
      shares: '--'
    }
  ];

  return (
    <TableContainer>
      <SectionHeader>Top Institutional Holders</SectionHeader>
      
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Percentage</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader $align="right">Shares</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {displayOwners.map((owner, index) => (
            <TableRow key={index}>
              <PercentageCell>{owner.percentage}</PercentageCell>
              <NameCell>{owner.name}</NameCell>
              <SharesCell>{owner.shares}</SharesCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default OwnershipTable;