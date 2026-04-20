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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 26px 30px 60px 30px;
  max-width: 100%;

  @media only screen and (max-width: 576px) {
    padding: 20px 16px 60px 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 12px 20px 60px 20px;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    padding: 16px 24px 60px 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  gap: 30px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const ShimmerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 12px;
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

const ShimmerCurrencyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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

const ShimmerOtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
  gap: 2px;
`;

const ShimmerSubHeader = styled.div`
  width: 140px;
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

const renderShimmerItems = (count: number) => {
  return Array(count).fill(0).map((_, index) => (
    <ShimmerCurrencyItem key={index}>
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
    </ShimmerCurrencyItem>
  ));
};

const LoadingComponent = () => {
  return (
    <Wrapper>
      <Grid>
        <ShimmerCard>
          <ShimmerHeader />
          {renderShimmerItems(1)}
          <ShimmerLineChart />
          <ShimmerOtherContainer>
            <ShimmerSubHeader />
            {renderShimmerItems(8)}
          </ShimmerOtherContainer>
          <ShimmerFooter>
            <ShimmerTextSmall width="120px" />
            <ShimmerTextSmall width="180px" />
          </ShimmerFooter>
        </ShimmerCard>

        <ShimmerCard>
          <ShimmerHeader />
          {renderShimmerItems(1)}
          <ShimmerLineChart />
          <ShimmerOtherContainer>
            <ShimmerSubHeader />
            {renderShimmerItems(8)}
          </ShimmerOtherContainer>
          <ShimmerFooter>
            <ShimmerTextSmall width="120px" />
            <ShimmerTextSmall width="180px" />
          </ShimmerFooter>
        </ShimmerCard>

        <ShimmerCard>
          <ShimmerHeader />
          <ShimmerOtherContainer>
            <ShimmerSubHeader />
            {renderShimmerItems(38)}
          </ShimmerOtherContainer>
          <ShimmerFooter>
            <ShimmerTextSmall width="120px" />
            <ShimmerTextSmall width="180px" />
          </ShimmerFooter>
        </ShimmerCard>

        <ShimmerCard>
          <ShimmerHeader />
          {renderShimmerItems(1)}
          <ShimmerLineChart />
          <ShimmerOtherContainer>
            <ShimmerSubHeader />
            {renderShimmerItems(7)}
          </ShimmerOtherContainer>
          <ShimmerFooter>
            <ShimmerTextSmall width="120px" />
            <ShimmerTextSmall width="180px" />
          </ShimmerFooter>
        </ShimmerCard>
      </Grid>
    </Wrapper>
  );
};

export default LoadingComponent;