"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "@/components/buttons/button";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Proxima Nova', sans-serif;
`;

const Main = styled.main`
  flex: 1;
  padding: 60px 24px 80px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 34px;
`;

const Title = styled.h1`
  font-family: 'Proxima Nova', sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  line-height: 1.15;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  margin: 0;
  max-width: 760px;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 6px;
`;

const LinkReset = styled(Link)`
  text-decoration: none;
`;

const OutlineButton = styled(Button)`
  border-radius: 2px;
  height: 38px;
  padding: 8px 22px;
  font-size: 14px;
`;

const PrimaryButton = styled(Button)`
  border-radius: 2px;
  height: 38px;
  padding: 8px 22px;
  font-size: 14px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.boxBg};
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const CardTitle = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.01em;
  margin: 0;
`;

const CardBody = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  margin: 0;
`;

const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  font-size: 12px;
  font-weight: 700;
`;

const FooterNote = styled.div`
  margin-top: 28px;
  border-left: 4px solid ${({ theme }) => theme.colors.select || "#2e7d32"};
  background: ${({ theme }) => theme.colors.boxBg};
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  font-size: 14px;
  line-height: 1.6;
`;

export default function ApiPage() {
  return (
    <PageWrapper>
      <Main>
        <Hero>
          <Title>28 Markets API</Title>
          <Subtitle>
            A finance API for developers who need clean, fast market data for building dashboards, trading tools, alerts,
            and analytics. Get access to Forex, commodities, crypto, and Ghana stocks data in one product.
          </Subtitle>

          <ActionsRow>
            <LinkReset href="/pricing">
              <PrimaryButton variant="primary">See pricing</PrimaryButton>
            </LinkReset>
            <LinkReset href="/docs">
              <OutlineButton variant="outline">Read docs</OutlineButton>
            </LinkReset>
          </ActionsRow>
        </Hero>

        <Grid>
          <Card>
            <CardTitle>Forex</CardTitle>
            <CardBody>
              Live FX rates and pair data suitable for pricing, charts, and cross-currency conversions.
            </CardBody>
            <Chips>
              <Chip>Major cedi pairs</Chip>
              <Chip>Price changes</Chip>
              <Chip>Rate history</Chip>
            </Chips>
          </Card>

          <Card>
            <CardTitle>Commodities</CardTitle>
            <CardBody>
              Track commodity prices like gold, oil, and other key market instruments for macro and portfolio insights.
            </CardBody>
            <Chips>
              <Chip>Spot prices</Chip>
              <Chip>Daily change</Chip>
              <Chip>History</Chip>
            </Chips>
          </Card>

          <Card>
            <CardTitle>Crypto</CardTitle>
            <CardBody>
              Crypto market pricing data to power watchlists, alerts, and real-time dashboards.
            </CardBody>
            <Chips>
              <Chip>Top assets</Chip>
              <Chip>Statistics</Chip>
              <Chip>History</Chip>
            </Chips>
          </Card>

          <Card>
            <CardTitle>Stocks (Ghana)</CardTitle>
            <CardBody>
              Ghana Stock Exchange focused data for local market apps, research, and investor tools.
            </CardBody>
            <Chips>
              <Chip>Company data</Chip>
              <Chip>Price history</Chip>
              <Chip>GSE market status</Chip>
            </Chips>
          </Card>
        </Grid>

        <FooterNote>
          Use your API key to authenticate requests. Rate limits depend on your plan. Visit{" "}
          <Link href="/pricing" style={{ color: "inherit", fontWeight: 800, textDecoration: "underline" }}>
            pricing
          </Link>{" "}
          to pick a tier.
        </FooterNote>
      </Main>
    </PageWrapper>
  );
}

