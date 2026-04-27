'use client'

import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const shimmerLine = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 100px;

  @media only screen and (max-width: 576px) { 
    padding-top: 12px;
    margin-left: 16px;
    margin-right: 16px;
    max-width: 100vw;
  }
  @media only screen and (min-width: 577px) and (max-width: 768px) { 
    padding-top: 12px;
    margin-left: 16px;
    margin-right: 16px;
    max-width: 100vw;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 32px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5px;
    background: ${({ theme }) => theme.colors.border};
    left: 70%;
    transform: translateX(-0.75px);
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    &:before {
      display: none;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 16px 24px;
  margin-top: -16px;

  @media only screen and (max-width: 576px) { 
    padding: 16px 0px;
    margin-top: 0;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) { 
    padding: 16px 0px;
    margin-top: -12px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const HeaderText = styled.p`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  margin: 0;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};

  @media only screen and (max-width: 768px) {
    font-size: 22px;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    font-size: 22px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const ShimmerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: ${({ theme }) => theme.colors.boxBg};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const ShimmerHeader = styled.div`
  width: 150px;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ShimmerStockHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 18px;
  padding-top: 14px;
  margin-bottom: 20px;
`;

const ShimmerLogo = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 999px !important;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;

  @media only screen and (max-width: 768px) {
    width: 68px;
    height: 68px;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    width: 88px;
    height: 88px;
  }
`;

const ShimmerStockHeadInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  margin-top: -12px;
`;

const ShimmerTitle = styled.div`
  width: 200px;
  height: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;

  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 28px;
  }
`;

const ShimmerInfoChip = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0px 12px;
  width: fit-content;
`;

const ShimmerChipText = styled.div`
  width: 60px;
  height: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ShimmerPriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 2px;
  margin-bottom: 8px;
`;

const ShimmerPrice = styled.div`
  width: 120px;
  height: 38px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;

  @media only screen and (max-width: 768px) {
    width: 80px;
    height: 28px;
  }
`;

const ShimmerChange = styled.div`
  width: 80px;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;

  @media only screen and (max-width: 768px) {
    width: 60px;
    height: 21px;
  }
`;

const ShimmerTabs = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

const ShimmerTab = styled.div`
  width: 100px;
  height: 32px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ShimmerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ShimmerText = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 16px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ShimmerTextSmall = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 12px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 16px 0;
  position: relative;
  background: ${({ theme }) => theme.colors.boxBg};
  border-radius: 8px;
  overflow: hidden;
`;

const ChartGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChartArea = styled.div`
  position: absolute;
  top: 40px;
  left: 60px;
  right: 20px;
  bottom: 40px;
`;

const StyledSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const ShimmerLine = styled.path`
  stroke: ${({ theme }) => theme.colors.stroke};
  stroke-width: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${shimmerLine} 2s ease-in-out infinite;
`;

const ShimmerDot = styled.circle`
  fill: ${({ theme }) => theme.colors.stroke};
  animation: ${shimmer} 1.5s infinite;
`;

const YAxisLabel = styled.div`
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: 60px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const XAxisLabel = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 12px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ShimmerIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ShimmerSubHeader = styled.div`
  width: 140px;
  height: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border} 0%,
    ${({ theme }) => theme.colors.stroke} 50%,
    ${({ theme }) => theme.colors.border} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const ShimmerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  padding-top: 12px;
`;

const ShimmerLineChart = () => {
  const points = [
    { x: 0, y: 60 },
    { x: 12.5, y: 45 },
    { x: 25, y: 70 },
    { x: 37.5, y: 35 },
    { x: 50, y: 55 },
    { x: 62.5, y: 40 },
    { x: 75, y: 65 },
    { x: 87.5, y: 45 },
    { x: 100, y: 55 },
  ];

  const linePath = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <ChartContainer>
      <ChartGrid>
        <ChartArea>
          <StyledSvg viewBox="0 0 100 100" preserveAspectRatio="none">
            <ShimmerLine d={linePath} />
            {points.map((point, index) => (
              <ShimmerDot
                key={index}
                cx={point.x}
                cy={point.y}
                r="0.5"
              />
            ))}
          </StyledSvg>
        </ChartArea>
        <YAxisLabel />
        <XAxisLabel />
      </ChartGrid>
    </ChartContainer>
  );
};

const renderShimmerRows = (count: number) => {
  return Array(count).fill(0).map((_, index) => (
    <ShimmerRow key={index}>
      <LeftSection>
        <ShimmerIcon />
        <TextGroup>
          <ShimmerText width="120px" />
          <ShimmerTextSmall width="80px" />
        </TextGroup>
      </LeftSection>
      <RightSection>
        <TextGroup style={{ alignItems: 'flex-end' }}>
          <ShimmerText width="60px" />
          <ShimmerTextSmall width="50px" />
        </TextGroup>
      </RightSection>
    </ShimmerRow>
  ));
};

const LoadingComponent = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Left>
          <ShimmerCard style={{ padding: '12px' }}>
            <ShimmerStockHead>
              <ShimmerLogo />
              <ShimmerStockHeadInner>
                <ShimmerTitle />
                <ShimmerInfoChip>
                  <ShimmerChipText />
                  <ShimmerTextSmall width="10px" />
                  <ShimmerChipText />
                </ShimmerInfoChip>
                <ShimmerPriceRow>
                  <ShimmerPrice />
                  <ShimmerChange />
                </ShimmerPriceRow>
                <ShimmerInfoChip>
                  <ShimmerChipText />
                  <ShimmerChipText />
                </ShimmerInfoChip>
              </ShimmerStockHeadInner>
            </ShimmerStockHead>

            <ShimmerLineChart />

            <ShimmerTabs>
              <ShimmerTab />
              <ShimmerTab />
              <ShimmerTab />
            </ShimmerTabs>

            <div style={{ width: '100%' }}>
              {renderShimmerRows(10)}
            </div>

            <div style={{ width: '100%', marginTop: '24px' }}>
              <ShimmerSubHeader />
              {renderShimmerRows(8)}
            </div>

            <ShimmerFooter>
              <ShimmerTextSmall width="120px" />
              <ShimmerTextSmall width="180px" />
            </ShimmerFooter>
          </ShimmerCard>
        </Left>

        <Right>
          <ShimmerCard style={{ padding: '12px' }}>
            <Header>
              <HeaderText>More Stocks on GSE</HeaderText>
            </Header>
            <Content>
              {renderShimmerRows(18)}
            </Content>
            <ShimmerFooter>
              <ShimmerTextSmall width="120px" />
              <ShimmerTextSmall width="180px" />
            </ShimmerFooter>
          </ShimmerCard>
        </Right>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default LoadingComponent;

export const BodyLoadingComponent = () => {
  return (
    <ShimmerCard style={{ padding: '12px' }}>
      <Header>
        <HeaderText>More Stocks on GSE</HeaderText>
      </Header>
      <Content>
        {renderShimmerRows(8)}
      </Content>
    </ShimmerCard>
  );
};