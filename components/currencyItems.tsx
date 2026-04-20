'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface DataItemProps {
  label: string;
  code: string;
  value: number | string;
  change: number;
  image?: string;
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
  padding: 8px 0;
  border-top: 1px solid var(--border);;
`;

const TickerImage = styled(Image)`
  height: 100%;
  object-fit: contain;
`;

const Currency = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const CurrencyContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencyCombo = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
`;

const CurrencySymbol = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.grayText};;
  font-family: inherit;
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
      ? '#888888' 
      : $isPositive 
        ? '#13D14C' 
        : '#FF0606'
  };
`;

const CurrencyValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Icon = styled(Image)`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

export const CurrencyItem: React.FC<DataItemProps> = ({ label, code, value, change, image }) => {
  const isPositive = Number(change) > 0;
  const isNegative = Number(change) < 0;
  const isUnchanged = Number(change) === 0;

  const iconSrc = isPositive 
    ? '/assets/icons/up.svg' 
    : isNegative 
      ? '/assets/icons/down.svg' 
      : null;
  const iconAlt = isPositive ? 'increase' : 'decrease';

  return (
    <Block>
      <Currency>
        {image && (
          <TickerImage src={image} alt="ticker" width={44} height={24} />
        )}
        <CurrencyContent>
          <CurrencyCombo>{label}</CurrencyCombo>
          <CurrencySymbol>{code}</CurrencySymbol>
        </CurrencyContent>
      </Currency>
      <Info>
        <DataChangeContainer>
          <DataChange 
            $isPositive={isPositive}
            $isUnchanged={isUnchanged}
          >
            {Math.abs(change)}%
          </DataChange>
          {!isUnchanged && (
            <Icon src={iconSrc} alt={iconAlt} width={16} height={16} />
          )}
        </DataChangeContainer>
        <CurrencyValue>{value}</CurrencyValue>
      </Info>
    </Block>
  );
};

export const CurrencyWidget = () => (
  <Wrapper>
    <Header>
      <HeaderText>Currency Overview</HeaderText>
    </Header>
    <Content>
      <CurrencyItem image="/assets/forex/usd-ghs.png" label="USD to GHS" code="GHS" value="11.20" change={-0.35} />
      <CurrencyItem image="/assets/forex/eur-ghs.png" label="EUR to GHS" code="GHS" value="12.85" change={0.42} />
      <CurrencyItem label="GBP to GHS" code="GHS" value="14.10" change={0.05} />
    </Content>
  </Wrapper>
);
