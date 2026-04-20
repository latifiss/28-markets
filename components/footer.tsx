'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const Component = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 40px 16px;
    background: ${({ theme }) => theme.colors.background};
    border-top: 1px solid ${({ theme }) => theme.colors.adBg};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 4px 0;
    margin-bottom: 14px;
`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    padding: 4px 0;
    gap: 16px;

    @media (max-width: 576px) {
        gap: 12px;
    }
`

const SiteLink = styled(Link)`
    display: block;
    width: fit-content;
    line-height: 0;
    text-decoration: none;
    
    &:hover,
    &:focus,
    &:active,
    &:visited {
        text-decoration: none;
    }
`

const SiteLogo = styled(Image)`
    height: 20px;
    width: auto;
    object-fit: contain;

    @media (max-width: 576px) {
        height: 14px;
    }
`

const PageInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const PageTitle = styled.p`
  font-size: 14px;
  line-height: 1.2;
  font-weight: 700;
  margin: 0;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

const PageFoot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 0 0;
    gap: 16px;
    margin-top: 12px;
`

const FootText = styled.p`
  font-size: 13px;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.grayText};
  text-align: left;
`;

const Footer = () => {
  return (
      <Component>
          <Top>
              <PageInfo>
                  <PageTitle>2016 - 2026 TheSportsDB.com</PageTitle>
              </PageInfo>
          </Top>
          <Bottom>
              <SiteLink href="https://www.cockroachlabs.com/" target="_blank" rel="noopener noreferrer">
                  <SiteLogo src="/assets/websites/cockroach_news.svg" alt="Cockroach News" width={120} height={20} />
              </SiteLink>
              
              <SiteLink href="https://www.countries-sql.com/" target="_blank" rel="noopener noreferrer">
                  <SiteLogo src="/assets/websites/countries_sql.svg" alt="Countries SQL" width={120} height={20} />
              </SiteLink>
              
              <SiteLink href="https://www.theafricanplaces.com/" target="_blank" rel="noopener noreferrer">
                  <SiteLogo src="/assets/websites/the_african_places.svg" alt="The African Places" width={120} height={20} />
              </SiteLink>
              
              <SiteLink href="https://www.f1api.com/" target="_blank" rel="noopener noreferrer">
                  <SiteLogo src="/assets/websites/f1api_black.svg" alt="F1 API" width={120} height={20} />
              </SiteLink>
          </Bottom>
          <PageFoot>
              <SiteLink href="/terms" rel="noopener noreferrer">
                  <FootText>Terms</FootText>
              </SiteLink>
              <SiteLink href="/privacy" rel="noopener noreferrer">
                  <FootText>Privacy</FootText>
              </SiteLink>
              <SiteLink href="/cookies" rel="noopener noreferrer">
                  <FootText>Cookie-policy</FootText>
              </SiteLink>
          </PageFoot>
    </Component>
  )
}

export default Footer