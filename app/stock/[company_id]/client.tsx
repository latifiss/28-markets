'use client';

import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';

import IndexChartDemo from '@/components/idDemo';
import { StockItem } from '@/components/stockItem';
import OverviewTable from '@/components/tables/overview';
import FinHighlight from '@/components/tables/finHighlight';
import DividendTable from '@/components/tables/dividentTable';
import PerformanceChart from '@/components/charts/performanceChart';
import stocksApi, { Profile, Statistics, Dividends, Earnings, Financial, Holders, PriceHistory } from '@/lib/api/stocks';
import { getStockLogo } from '@/utils/getStockLogo';
import { formatPercentage } from '@/utils/percentageFormatter';
import { getArticlesByTag } from '@/lib/api/articles';
import type { Article } from '@/lib/api/articles';
import LoadingComponent from './loading';

const blink = keyframes`
    0% {
        box-shadow: 0 0 0 0px rgba(74,178,75, 0.7);
    }
    50% {
        box-shadow: 0 0 0 5px rgba(74,178,75, 0);
    }
    100% {
        box-shadow: 0 0 0 0px rgba(74,178,75, 0.7);
    }
`;

const MarketDot = styled.div<{ $isOpen: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $isOpen }) => ($isOpen ? '#4ab24b' : '#00c1d1')};
    
    ${({ $isOpen }) => $isOpen && css`
        animation: ${blink} 1.5s infinite;
    `}
`;

const MarketStatusText = styled.p<{ $isOpen: boolean }>`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
    font-family: inherit;
    color: ${({ $isOpen }) => ($isOpen ? '#4ab24b' : '#00c1d1')};
`;

const MarketStatus: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <React.Fragment>
        <MarketDot $isOpen={isOpen} />
        <MarketStatusText $isOpen={isOpen}>
            {isOpen ? 'Market Open' : 'Market Closed'}
        </MarketStatusText>
    </React.Fragment>
);

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

    @media only screen and (max-width: 576px) { 
        padding: 16px 0px;
    }

    @media only screen and (min-width: 577px) and (max-width: 768px) { 
        padding: 16px 0px;
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

const StockHead = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 18px;
`;

const StockHeadInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    margin-top: -12px;
`;

const StockTitle = styled.p`
    font-size: 40px;
    line-height: 1.1;
    font-weight: 700;
    margin: 0 0 8px 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 22px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 22px;
    }
`;

const StockLogo = styled(Image)`
    object-fit: cover;
    width: 168px;
    height: 168px;
    border-radius: 99px;

    @media only screen and (max-width: 768px) {
        width: 68px;
        height: 68px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        width: 88px;
        height: 88px;
    }
`;

const StockHeadInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    height: 36px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0px 12px;

    @media only screen and (max-width: 768px) {
        margin-top: -12px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        margin-top: -8px;
    }
`;

const StockSymbol = styled.p`
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 17px;
        line-height: 20px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const StockDot = styled.p`
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 13px;
        line-height: 13px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 13px;
        line-height: 13px;
    }
`;

const StockExchange = styled.p`
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 17px;
        line-height: 20px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const StockPriceRow = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    gap: 8px;
    margin-top: 2px;
    margin-bottom: 8px;

    @media only screen and (max-width: 768px) {
        margin-bottom: 13px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        margin-bottom: 13px;
    }
`;

const StockValueRow = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    width: fit-content;
    gap: 4px;
`;

const StockValue = styled.p`
    font-size: 38px;
    line-height: 38px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 28px;
        line-height: 28px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 28px;
        line-height: 28px;
    }
`;

const StockCurrency = styled.p`
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};

    @media only screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 16px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 14px;
        line-height: 16px;
    }
`;

const StockChange = styled.p<{ $isPositive: boolean; $isUnchanged: boolean }>`
    font-size: 28px;
    line-height: 32px;
    font-weight: 700;
    margin: 0;
    font-family: inherit;
    color: ${({ $isPositive, $isUnchanged }) => 
        $isUnchanged 
            ? '#727e8a' 
            : $isPositive 
                ? '#4ab24b' 
                : '#FF0606'};

    @media only screen and (max-width: 768px) {
        font-size: 21px;
        line-height: 21px;
    }

    @media only screen and (min-width: 769px) and (max-width: 992px) {
        font-size: 21px;
        line-height: 21px;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

const TabsContainer = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    overflow: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    background: transparent;
    border: none;
    width: fit-content;
    padding: 8px 0px;
    outline: none;
    cursor: pointer;
    color: ${({ $isActive }) => ($isActive ? '#2a5599' : '#888')};
    border-bottom: 2px solid ${({ $isActive }) => ($isActive ? '#2a5599' : 'transparent')};
    transition: all 0.2s;
    white-space: nowrap;
    overflow: hidden;
`;

const TabContent = styled.div`
    margin-top: 16px;
    font-family: inherit;
    font-size: 14px;
    width: 100%;
    margin-right: 24px;

    @media only screen and (max-width: 576px) { 
        margin-right: 0px;
    }

    @media only screen and (min-width: 577px) and (max-width: 768px) { 
        margin-right: 0px;
    }
`;

const SectInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
`;

const SectInfoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
`;

const SectTextHead = styled.p`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.grayText};
    text-align: left;
`;

const SectTextBody = styled.p`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};
    text-align: right;
`;

const SectTextDesc = styled.p`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin: 0;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};
    text-align: left;
    margin-top: 8px;
`;

const TabContentInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
`;

const TabContentInnerGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    @media only screen and (max-width: 576px) { 
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
    }

    @media only screen and (min-width: 577px) and (max-width: 768px) { 
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
    }
`;

const ErrorText = styled.p`
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    margin: 0;
    font-family: inherit;
    color: #FF0606;
    text-align: center;
    width: 100%;
    padding: 40px 0;
`;

const DebugContainer = styled.div`
    background: ${({ theme }) => theme.colors.border};
    padding: 16px;
    border-radius: 8px;
    margin: 16px 0;
    font-family: monospace;
    font-size: 12px;
    max-height: 300px;
    overflow-y: auto;
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
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
`;

const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

const ShimmerRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
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

const BodyLoadingComponent = () => {
    return (
        <>
            <ShimmerRow>
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
            <ShimmerRow>
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
            <ShimmerRow>
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
            <ShimmerRow>
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
        </>
    );
};

interface CompanyData {
    profile: Profile | null;
    statistics: Statistics | null;
    dividends: Dividends | null;
    earnings: Earnings | null;
    financial: Financial | null;
    holders: Holders | null;
    priceHistory: PriceHistory | null;
}

interface StockPageClientProps {
    companyId: string;
    initialData: CompanyData | null;
}

const StockPageClient = ({ companyId, initialData }: StockPageClientProps) => {
    const [isMarketOpen, setIsMarketOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hasShownContent, setHasShownContent] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData>(initialData || {
        profile: null,
        statistics: null,
        dividends: null,
        earnings: null,
        financial: null,
        holders: null,
        priceHistory: null
    });
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');
    const [moreStockStats, setMoreStockStats] = useState<Record<string, Statistics | null>>({});
    const [loadingStates, setLoadingStates] = useState({
        profile: true,
        statistics: true,
        dividends: true,
        earnings: true,
        financial: true,
        holders: true,
        priceHistory: true,
        moreStocks: true,
        articles: true
    });
    
    useEffect(() => {
        if (!initialData) {
            const fetchCompanyDataProgressively = async () => {
                try {
                    setDebugInfo('Starting progressive API calls...\n');
                    
                    const criticalData = await Promise.all([
                        stocksApi.getStatisticsByCompanyId(companyId),
                        stocksApi.getProfileByCompanyId(companyId)
                    ]);
                    
                    const [statisticsRes, profileRes] = criticalData;
                    
                    const extractData = (result: any, dataKey?: string) => {
                        if (!result) return null;
                        if (result.data) {
                            if (dataKey && result.data[dataKey]) {
                                return result.data[dataKey];
                            }
                            return result.data;
                        }
                        return result;
                    };
                    
                    const statistics = extractData(statisticsRes, 'statistics') || (statisticsRes?.statistics) || null;
                    const profile = extractData(profileRes, 'profile') || (profileRes?.profile) || null;
                    
                    setCompanyData(prev => ({
                        ...prev,
                        profile,
                        statistics
                    }));
                    
                    setLoadingStates(prev => ({
                        ...prev,
                        profile: false,
                        statistics: false
                    }));
                    
                    if (statistics?.key_statistics?.status) {
                        setIsMarketOpen(statistics.key_statistics.status === 'open');
                    }
                    
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                        setHasShownContent(true);
                    }
                    
                    const remainingData = await Promise.allSettled([
                        stocksApi.getDividendsByCompanyId(companyId),
                        stocksApi.getEarningsByCompanyId(companyId),
                        stocksApi.getFinancialByCompanyId(companyId),
                        stocksApi.getHoldersByCompanyId(companyId),
                        stocksApi.getCompanyPriceHistory(companyId)
                    ]);
                    
                    const [dividendsRes, earningsRes, financialRes, holdersRes, priceHistoryRes] = remainingData;
                    
                    const dividends = dividendsRes.status === 'fulfilled' ? extractData(dividendsRes.value, 'dividends') : null;
                    const earnings = earningsRes.status === 'fulfilled' ? extractData(earningsRes.value, 'earnings') : null;
                    const financial = financialRes.status === 'fulfilled' ? extractData(financialRes.value, 'financial') : null;
                    const holders = holdersRes.status === 'fulfilled' ? extractData(holdersRes.value, 'holders') : null;
                    const priceHistory = priceHistoryRes.status === 'fulfilled' ? extractData(priceHistoryRes.value, 'priceHistory') : null;
                    
                    setCompanyData(prev => ({
                        ...prev,
                        dividends,
                        earnings,
                        financial,
                        holders,
                        priceHistory
                    }));
                    
                    setLoadingStates(prev => ({
                        ...prev,
                        dividends: false,
                        earnings: false,
                        financial: false,
                        holders: false,
                        priceHistory: false
                    }));
                    
                    let debugLog = 'API Responses:\n';
                    debugLog += `Profile: ${profile ? 'Success' : 'Failed'}\n`;
                    debugLog += `Statistics: ${statistics ? 'Success' : 'Failed'}\n`;
                    debugLog += `Dividends: ${dividends ? 'Success' : 'Failed'}\n`;
                    debugLog += `Earnings: ${earnings ? 'Success' : 'Failed'}\n`;
                    debugLog += `Financial: ${financial ? 'Success' : 'Failed'}\n`;
                    debugLog += `Holders: ${holders ? 'Success' : 'Failed'}\n`;
                    debugLog += `PriceHistory: ${priceHistory ? 'Success' : 'Failed'}\n`;
                    
                    setDebugInfo(debugLog);
                    
                    if (!profile && !statistics) {
                        setError('Unable to load company data. Please try again.');
                    }
                    
                } catch (err) {
                    console.error('Error fetching company data:', err);
                    setError('Failed to load company data. Please try again later.');
                    setDebugInfo(prev => prev + `\nError: ${err}`);
                    setIsInitialLoad(false);
                    setHasShownContent(true);
                }
            };
            
            if (companyId) {
                fetchCompanyDataProgressively();
            }
        } else {
            setIsInitialLoad(false);
            setHasShownContent(true);
            setLoadingStates({
                profile: false,
                statistics: false,
                dividends: false,
                earnings: false,
                financial: false,
                holders: false,
                priceHistory: false,
                moreStocks: true,
                articles: true
            });
            if (initialData.statistics?.key_statistics?.status) {
                setIsMarketOpen(initialData.statistics.key_statistics.status === 'open');
            }
        }
    }, [companyId, initialData]);

    useEffect(() => {
        const TICKERS = [
            'ACCESS','AADS','ASG','ALLGH','EGH','GCB','GOIL','GGBL','MTNGH',
            'SOGEGH','SCB','TOTAL','TLW','UNIL','SIC','RBGH','TBL','FML'
        ];

        const fetchMoreStocks = async () => {
            try {
                const results = await Promise.all(
                    TICKERS.map(async (t) => {
                        try {
                            const res = await stocksApi.getStatisticsByCompanyId(t);
                            const apiData: any = (res as any)?.data ?? res;
                            const stats = apiData?.statistics ?? apiData ?? null;
                            return { t, stats };
                        } catch (err) {
                            console.error(`Error fetching stats for ${t}:`, err);
                            return { t, stats: null };
                        }
                    })
                );

                const map: Record<string, Statistics | null> = {};
                for (const r of results) {
                    map[r.t] = r.stats;
                }
                setMoreStockStats(map);
                setLoadingStates(prev => ({ ...prev, moreStocks: false }));
            } catch (err) {
                console.error('Error fetching more stock statistics:', err);
                setLoadingStates(prev => ({ ...prev, moreStocks: false }));
            }
        };

        fetchMoreStocks();
    }, []);
    
    const toggleMarket = () => {
        setIsMarketOpen(prev => !prev);
    };
    
    if ((isInitialLoad && !hasShownContent) || (!initialData && loadingStates.profile && loadingStates.statistics && !companyData.profile && !companyData.statistics)) {
        return <LoadingComponent />;
    }
    
    if (error || (!companyData.profile && !companyData.statistics && !loadingStates.profile && !loadingStates.statistics)) {
        return (
            <PageWrapper>
                <ContentWrapper>
                    <Left>
                        <ErrorText>{error || 'Company not found'}</ErrorText>
                        {debugInfo && (
                            <DebugContainer>
                                <pre>{debugInfo}</pre>
                            </DebugContainer>
                        )}
                    </Left>
                </ContentWrapper>
            </PageWrapper>
        );
    }
    
    const { profile, statistics } = companyData;
    
    const about = profile?.about || {
        company_name: 'Company',
        ticker_symbol: '',
        exchange_symbol: 'GSE',
        industry: 'N/A',
        chief_executive_officer: 'N/A',
        number_of_employees: 'N/A',
        headquaters: 'N/A',
        year_founded: 'N/A',
        isin_symbol: 'N/A',
        company_description: 'No description available.',
        slug: '',
        country: 'Ghana',
        currency: 'GHS'
    };
    
    const keyStats = statistics?.key_statistics || {
        current_price: '0.00',
        percentage_change: 0,
        currency: 'GHS',
        status: 'closed'
    };
    
    const currentPrice = keyStats.current_price || '0.00';
    const priceChange = keyStats.percentage_change || 0;
    const isPositiveChange = priceChange > 0;
    const isUnchangedChange = priceChange === 0;
    const formattedChange = formatPercentage(priceChange);
    const currency = keyStats.currency || 'GHS';
    const tickerSymbol = about.ticker_symbol || '';
    const companyName = about.company_name || 'Company';
    const exchangeName = about.exchange_symbol ? `${about.exchange_symbol} Stock Exchange` : 'Ghana Stock Exchange';
    const logoUrl = getStockLogo(tickerSymbol);

    return (
        <PageWrapper>
            <ContentWrapper>
                <Left>
                    <StockHead>
                        <StockLogo 
                            src={logoUrl} 
                            alt={`${companyName} Logo`} 
                            width={168} 
                            height={168}
                        />
                        <StockHeadInner>
                            <StockTitle>{companyName}</StockTitle>
                            
                            <StockHeadInfo onClick={toggleMarket} title='Click to toggle market status'>
                                <StockSymbol>{tickerSymbol}</StockSymbol>
                                <StockDot>•</StockDot>
                                <StockExchange>{exchangeName}</StockExchange>
                            </StockHeadInfo>
                            
                            <StockPriceRow>
                                <StockValueRow>
                                    <StockValue>{currentPrice}</StockValue>
                                    <StockCurrency>{currency}</StockCurrency>
                                </StockValueRow>
                                <StockChange $isPositive={isPositiveChange} $isUnchanged={isUnchangedChange}>
                                    {formattedChange}
                                </StockChange>
                            </StockPriceRow>
                            <StockHeadInfo onClick={toggleMarket} title='Click to toggle market status'>
                                <MarketStatus isOpen={isMarketOpen} /> 
                            </StockHeadInfo>
                        </StockHeadInner>
                    </StockHead>
                    
                    <IndexChartDemo companyData={companyData} />
                    
                    <InfoContainer>
                        <TabsContainer>
                            {['Overview', 'Financials', 'Earnings & Dividends'].map(tab => (
                                <TabButton
                                    key={tab}
                                    $isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </TabButton>
                            ))}
                        </TabsContainer>

                        <TabContent>
                            {activeTab === 'Overview' && (
                                <TabContentInner>
                                    <OverviewTable companyData={companyData} />
                                    
                                    <TabContentInnerGrid>
                                        <PerformanceChart 
                                            financialData={companyData.financial}
                                            title="Financial Performance"
                                            companyId={companyId}
                                        />
                                    </TabContentInnerGrid>
                                    
                                    <SectInfo>
                                        <Header>
                                            <HeaderText>About</HeaderText>
                                        </Header>
                                        <SectInfoRow>
                                            <SectTextHead>Sector</SectTextHead>
                                            <SectTextBody>{about.industry}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>Industry</SectTextHead>
                                            <SectTextBody>{about.industry}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>CEO</SectTextHead>
                                            <SectTextBody>{about.chief_executive_officer}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>Employees</SectTextHead>
                                            <SectTextBody>{about.number_of_employees}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>Headquarters</SectTextHead>
                                            <SectTextBody>{about.headquaters}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>Founded</SectTextHead>
                                            <SectTextBody>{about.year_founded}</SectTextBody>
                                        </SectInfoRow>
                                        <SectInfoRow>
                                            <SectTextHead>ISIN</SectTextHead>
                                            <SectTextBody>{about.isin_symbol}</SectTextBody>
                                        </SectInfoRow>
                                        <SectTextDesc>
                                            {about.company_description}
                                        </SectTextDesc>
                                    </SectInfo>
                                </TabContentInner>
                            )}
                            
                            {activeTab === 'Financials' && (
                                <TabContentInner>
                                    <FinHighlight companyData={companyData} />
                                </TabContentInner>
                            )}
                            
                            {activeTab === 'Earnings & Dividends' && (
                                <TabContentInner>
                                    <DividendTable companyData={companyData} />
                                </TabContentInner>
                            )}
                        </TabContent>
                    </InfoContainer>
                </Left>

                <Right>
                    <Header>
                        <HeaderText>More Stocks on GSE</HeaderText>
                    </Header>
                    <Content>
                        {!loadingStates.moreStocks ? (
                            <>
                                <StockItem
                                    image="/assets/stocks/access.svg"
                                    label="Access Bank"
                                    code="ACCESS"
                                    value={moreStockStats['ACCESS']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['ACCESS']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/ACCESS"
                                />
                                <StockItem
                                    image="/assets/stocks/anglogold.svg"
                                    label="AngloGold Ashanti"
                                    code="AGA"
                                    value={moreStockStats['AADS']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['AADS']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/AADS"
                                />
                                <StockItem
                                    image="/assets/stocks/asante-gold.svg"
                                    label="Asante Gold"
                                    code="ASG"
                                    value={moreStockStats['ASG']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['ASG']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/ASG"
                                />
                                <StockItem
                                    image="/assets/stocks/atlantic-lithium.svg"
                                    label="Atlantic Lithium"
                                    code="ALLGH"
                                    value={moreStockStats['ALLGH']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['ALLGH']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/ALLGH"
                                />
                                <StockItem
                                    image="/assets/stocks/ecobank.svg"
                                    label="Ecobank"
                                    code="EGH"
                                    value={moreStockStats['EGH']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['EGH']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/EGH"
                                />
                                <StockItem
                                    image="/assets/stocks/gcb.webp"
                                    label="Ghana Commercial Bank"
                                    code="GCB"
                                    value={moreStockStats['GCB']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['GCB']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/GCB"
                                />
                                <StockItem
                                    image="/assets/stocks/goil.svg"
                                    label="Goil"
                                    code="GOIL"
                                    value={moreStockStats['GOIL']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['GOIL']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/GOIL"
                                />
                                <StockItem
                                    image="/assets/stocks/guiness.svg"
                                    label="Guinness Ghana"
                                    code="GGBL"
                                    value={moreStockStats['GGBL']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['GGBL']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/GGBL"
                                />
                                <StockItem
                                    image="/assets/stocks/mtn.svg"
                                    label="MTN"
                                    code="MTNGH"
                                    value={moreStockStats['MTNGH']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['MTNGH']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/MTNGH"
                                />
                                <StockItem
                                    image="/assets/stocks/societe-general.svg"
                                    label="Societe Generale"
                                    code="SOGEGH"
                                    value={moreStockStats['SOGEGH']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['SOGEGH']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/SOGEGH"
                                />
                                <StockItem
                                    image="/assets/stocks/standard-chartered.svg"
                                    label="Standard Chartered"
                                    code="SCB"
                                    value={moreStockStats['SCB']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['SCB']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/SCB"
                                />
                                <StockItem
                                    image="/assets/stocks/total.svg"
                                    label="TotalEnergies"
                                    code="TOTAL"
                                    value={moreStockStats['TOTAL']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['TOTAL']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/TOTAL"
                                />
                                <StockItem
                                    image="/assets/stocks/tullow-oil.svg"
                                    label="Tullow Oil"
                                    code="TLW"
                                    value={moreStockStats['TLW']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['TLW']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/TLW"
                                />
                                <StockItem
                                    image="/assets/stocks/unilever.svg"
                                    label="Unilever Ghana"
                                    code="UNIL"
                                    value={moreStockStats['UNIL']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['UNIL']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/UNIL"
                                />
                                <StockItem
                                    image="/assets/stocks/sic.png"
                                    label="SIC Insurance"
                                    code="SIC"
                                    value={moreStockStats['SIC']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['SIC']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/SIC"
                                />
                                <StockItem
                                    image="/assets/stocks/republic.webp"
                                    label="Republic Bank"
                                    code="RBGH"
                                    value={moreStockStats['RBGH']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['RBGH']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/RBGH"
                                />
                                <StockItem
                                    image="/assets/stocks/trustbank.jpg"
                                    label="Trust Bank Gambia"
                                    code="TBL"
                                    value={moreStockStats['TBL']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['TBL']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/TBL"
                                />
                                <StockItem
                                    image="/assets/stocks/fanmilk.png"
                                    label="Fan Milk"
                                    code="FML"
                                    value={moreStockStats['FML']?.key_statistics?.current_price || ' '}
                                    change={Number(moreStockStats['FML']?.key_statistics?.percentage_change ?? 0)}
                                    link="/stock/FML"
                                />
                            </>
                        ) : (
                            <BodyLoadingComponent />
                        )}
                    </Content>
                </Right>
            </ContentWrapper>
        </PageWrapper>
    );
};

export default StockPageClient;