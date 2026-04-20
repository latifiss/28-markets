import PaginatedIndexChart, { ChartDataPoint, TimePeriod } from './paginatedIndexChart';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { CompanyData } from '@/types/stocks';
import stocksApi from '@/lib/api/stocks';

const DemoWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 100%;
    font-family: inherit;
    font-size: 14px;
`;

interface IndexChartDemoProps {
  companyData: CompanyData;
}

const formatTooltip = (data: number, key: string, tickerSymbol: string): [string, string] => {
  return [`${key}:`, `${data.toFixed(2)} (${tickerSymbol})`];
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? '2-digit' : undefined
  });
};

const extractDataFromCompanyData = (companyData: CompanyData): ChartDataPoint[] => {
  if (companyData.priceHistory?.history && Array.isArray(companyData.priceHistory.history)) {
    return companyData.priceHistory.history
      .map(entry => ({
        date: new Date(entry.date).toISOString().split('T')[0],
        value: parseFloat(entry.price)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  return [];
};

const calculatePeriodReturn = (data: ChartDataPoint[]): number => {
  if (data.length < 2) return 0;
  
  const firstPrice = data[0].value;
  const lastPrice = data[data.length - 1].value;
  
  if (firstPrice === 0) return 0; 
  
  return ((lastPrice - firstPrice) / firstPrice) * 100;
};

export default function IndexChartDemo({ companyData }: IndexChartDemoProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>('1M');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [periodReturn, setPeriodReturn] = useState<number>(0);
  
  const companyId = companyData.profile?.company_id || '';
  const tickerSymbol = companyData.profile?.about?.ticker_symbol || '';
  const currentPrice = companyData.statistics?.key_statistics?.current_price || 0;
  const currency = companyData.statistics?.key_statistics?.currency || 'GHS';

  const prevCompanyIdRef = useRef<string>('');
  const prevPeriodRef = useRef<TimePeriod>('1M');

  const fetchDataForPeriod = useCallback(async (period: TimePeriod): Promise<ChartDataPoint[]> => {
    if (!companyId) return [];
    
    try {
      let response;
      
      switch (period) {
        case '1M':
          response = await stocksApi.getCompanyPriceHistoryByLast3Months(companyId);
          break;
        case '6M':
          response = await stocksApi.getCompanyPriceHistoryByLast6Months(companyId);
          break;
        case 'YTD':
          response = await stocksApi.getCompanyPriceHistoryByYearToDate(companyId);
          break;
        case '1Y':
          response = await stocksApi.getCompanyPriceHistoryByLast1Year(companyId);
          break;
        case '5Y':
          response = await stocksApi.getCompanyPriceHistoryByLast5Years(companyId);
          break;
        case 'ALL':
          response = await stocksApi.getCompanyAllTimePriceHistory(companyId);
          break;
        default:
          response = await stocksApi.getCompanyPriceHistory(companyId);
      }
      
      if (response && response.data) {
        const priceHistory = response.data.priceHistory || response.data;
        if (priceHistory?.history && Array.isArray(priceHistory.history)) {
          return priceHistory.history
            .map((entry: any) => ({
              date: new Date(entry.date).toISOString().split('T')[0],
              value: parseFloat(entry.price)
            }))
            .sort((a: ChartDataPoint, b: ChartDataPoint) => 
              new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        }
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching ${period} price history:`, error);
      return [];
    }
  }, [companyId]);

  useEffect(() => {
    if (hasInitialized || !companyId || companyId === prevCompanyIdRef.current) {
      return;
    }
    
    const initializeChartData = async () => {
      setLoading(true);
      
      const initialData = extractDataFromCompanyData(companyData);
      
      if (initialData.length > 0) {
        const last30Data = initialData.slice(-30);
        setChartData(last30Data);
        setPeriodReturn(calculatePeriodReturn(last30Data));
      } else {
        const apiData = await fetchDataForPeriod('1M');
        
        if (apiData.length > 0) {
          setChartData(apiData);
          setPeriodReturn(calculatePeriodReturn(apiData));
        } else {
          const fallbackData: ChartDataPoint[] = [];
          const today = new Date();
          for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            fallbackData.push({
              date: date.toISOString().split('T')[0],
              value: parseFloat(currentPrice.toString()) || 1.0
            });
          }
          setChartData(fallbackData);
          setPeriodReturn(0);
        }
      }
      
      prevCompanyIdRef.current = companyId;
      setHasInitialized(true);
      setLoading(false);
    };

    initializeChartData();
  }, [companyId, companyData, currentPrice, hasInitialized, fetchDataForPeriod]);

  const handlePeriodChange = useCallback(async (period: TimePeriod) => {
    if (period === prevPeriodRef.current || !companyId) {
      return;
    }
    
    setLoading(true);
    setCurrentPeriod(period);
    prevPeriodRef.current = period;
    
    const newData = await fetchDataForPeriod(period);
    
    if (newData.length > 0) {
      setChartData(newData);
      setPeriodReturn(calculatePeriodReturn(newData));
    } else {
      const existingData = extractDataFromCompanyData(companyData);
      if (existingData.length > 0) {
        const now = new Date();
        let cutoffDate: Date;
        
        switch (period) {
          case '1M':
            cutoffDate = new Date(now);
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case '6M':
            cutoffDate = new Date(now);
            cutoffDate.setMonth(now.getMonth() - 6);
            break;
          case 'YTD':
            cutoffDate = new Date(now.getFullYear(), 0, 1);
            break;
          case '1Y':
            cutoffDate = new Date(now);
            cutoffDate.setFullYear(now.getFullYear() - 1);
            break;
          case '5Y':
            cutoffDate = new Date(now);
            cutoffDate.setFullYear(now.getFullYear() - 5);
            break;
          case 'ALL':
          default:
            setChartData(existingData);
            setPeriodReturn(calculatePeriodReturn(existingData));
            setLoading(false);
            return;
        }
        
        const filteredData = existingData.filter(item => 
          new Date(item.date) >= cutoffDate
        );
        setChartData(filteredData);
        setPeriodReturn(calculatePeriodReturn(filteredData));
      } else {
        setPeriodReturn(0);
      }
    }
    
    setLoading(false);
  }, [companyId, companyData, fetchDataForPeriod]);

  const getXAxisTickFormatter = () => {
    switch (currentPeriod) {
      case '1M':
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
        };
      case '6M':
      case 'YTD':
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', { 
            month: 'short'
          });
        };
      case '1Y':
      case '5Y':
      case 'ALL':
      default:
        return (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: '2-digit' 
          });
        };
    }
  };

  const calculateYAxisDomain = (data: ChartDataPoint[]): [number, number] => {
    if (data.length === 0) return [0, parseFloat(currentPrice.toString()) || 10];
    
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1; 
    
    return [Math.max(0, min - padding), max + padding];
  };

  const getLineColor = () => {
    return periodReturn >= 0 ? '#13D14C' : '#FF0606';
  };

  const getYAxisLabel = () => {
    return currency || 'Price';
  };

  const getCurrentPriceLabel = () => {
    const formattedCurrentPrice = parseFloat(currentPrice.toString()).toFixed(2);
    const returnSign = periodReturn >= 0 ? '+' : '';
    const formattedReturn = periodReturn.toFixed(2);
    
    return `${currency} ${formattedCurrentPrice} (${returnSign}${formattedReturn}%)`;
  };

  if (loading && chartData.length === 0) {
    return (
      <DemoWrapper>
        <div style={{ 
          width: '100%', 
          height: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #e7e7e7',
          borderRadius: '8px'
        }}>
          Loading chart data...
        </div>
      </DemoWrapper>
    );
  }

  if (chartData.length === 0) {
    return (
      <DemoWrapper>
        <div style={{ 
          width: '100%', 
          height: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #e7e7e7',
          borderRadius: '8px',
          color: '#666',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div>No price history data available for {tickerSymbol}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            Company ID: {companyId}
          </div>
        </div>
      </DemoWrapper>
    );
  }

  const yAxisDomain = calculateYAxisDomain(chartData);

  return (
    <DemoWrapper>
      <PaginatedIndexChart
        data={chartData}
        onTimePeriodChange={handlePeriodChange}
        color={getLineColor()}
        height={400}
        showGrid
        xAxisOptions={{
          tickFormatter: getXAxisTickFormatter(),
          tickRotation: currentPeriod === '1D' ? -45 : 0,
          interval: Math.ceil(chartData.length / 10),
          dataKey: 'date'
        }}
        yAxisOptions={{
          tickFormatter: (value: number) => value.toFixed(2),
          domain: yAxisDomain,
          label: {
            value: getYAxisLabel(),
            angle: -90,
            position: 'insideLeft',
            style: { fontSize: 14 }
          }
        }}
        lineOptions={{
          strokeWidth: 2,
          curveType: 'monotone',
          showDot: chartData.length < 50,
          dotSize: 4,
          dotColor: getLineColor()
        }}
        margin={{ left: 60, right: 20, top: 20, bottom: 50 }}
        tooltipFormatter={(value: number) =>
          formatTooltip(value, 'Price', tickerSymbol)
        }
        tooltipLabelFormatter={(label: string) => {
          return formatDate(label);
        }}
        showCurrentPrice={true}
        currentPrice={parseFloat(currentPrice.toString())}
        currentPriceLabel={getCurrentPriceLabel()}
        isLoading={loading}
        showPeriodReturn={true}
        periodReturn={periodReturn}
      />
    </DemoWrapper>
  );
}