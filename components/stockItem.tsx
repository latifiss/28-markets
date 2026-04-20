'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinus } from 'react-icons/fi';

interface DataItemProps {
  label: string;
  code: string;
  value: number | string;
  change: number;
  image?: string;
  link?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  gap: 0px;
  border: 1px solid var(--primary-main);
  width: 255px;
  border-radius: 2px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    width: 220px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
`;

const HeaderText = styled.p`
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  color: var(--primary-main);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0 8px 0;
  border-top: 1px solid var(--border);;
`;

const TickerImage = styled(Image)`
    object-fit: cover;
    border-radius: 999px;
`

const Stock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const StockContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockCombo = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const StockSymbol = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayText};;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const DataChangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DataChange = styled.p<{ 
  $isPositive: boolean;
  $isUnchanged: boolean;
}>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isPositive, $isUnchanged }) => 
    $isUnchanged 
      ? '#727e8a' 
      : $isPositive 
        ? '#13D14C' 
        : '#FF0606'
  };
`;

const StockValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Icon = styled(Image)`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const DashIcon = styled(FiMinus)`
  width: 16px;
  height: 16px;
  color: #727e8a;
`;

export const StockItem: React.FC<DataItemProps> = ({ label, code, value, change, image, link }) => {
  const isPositive = Number(change) > 0;
  const isNegative = Number(change) < 0;
  const isUnchanged = Number(change) === 0;

  const iconSrc = isPositive 
    ? '/assets/icons/up.svg' 
    : isNegative 
      ? '/assets/icons/down.svg' 
      : null;
  const iconAlt = isPositive ? 'increase' : 'decrease';

  const content = (
    <>
      <Stock>
        <TickerImage
          src={image || ''}
          alt="ticker"
          width={30}
          height={30}
        />
        <StockContent>
          <StockCombo>{label}</StockCombo>
          <StockSymbol>{code}</StockSymbol>
        </StockContent>
      </Stock>
      <Info>
        <DataChangeContainer>
          <DataChange 
            $isPositive={isPositive}
            $isUnchanged={isUnchanged}
          >
            {Math.abs(change)}%
          </DataChange>
          {isUnchanged && <div></div>}
          {!isUnchanged && iconSrc && (
            <Icon src={iconSrc} alt={iconAlt} width={16} height={16} />
          )}
        </DataChangeContainer>
        <StockValue>GH₵ {value}</StockValue>
      </Info>
    </>
  );

  if (link) {
    return (
      <Link href={link} style={{ textDecoration: 'none', width: '100%' }}>
        <Block>
          {content}
        </Block>
      </Link>
    );
  }

  return (
    <Block>
      {content}
    </Block>
  );
};

export const StockWidget = () => (
  <Wrapper>
    <Header>
      <HeaderText>Stock Overview</HeaderText>
    </Header>
    <Content>
      <StockItem image='/assets/forex/usd-ghs.png' label="USD to GHS" code="GHS" value="11.20" change={-0.35} />
      <StockItem image='/assets/forex/eur-ghs.png' label="EUR to GHS" code="GHS" value="12.85" change={0.42} />
      <StockItem image='/assets/forex/gbp-ghs.png' label="GBP to GHS" code="GHS" value="14.10" change={0.05} />
    </Content>
  </Wrapper>
);