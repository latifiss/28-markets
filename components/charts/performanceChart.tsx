'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Financial } from '@/lib/api/stocks';
import { 
  transformFinancialDataForChart, 
  PerformanceDataItem,
} from '@/utils/performanceChartHelper';

const DEFAULT_COLORS = {
  Revenue: '#4285F4',
  'Net income': '#4DC6B5',
  'Net margin %': '#4285F4',
};

const ChartContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Proxima Nova';
  font-weight: 500;
  color: #333;
  overflow: hidden;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
`;

const Title = styled.h3`
  font-family: 'Proxima Nova';
  font-weight: 700;
  font-size: 1.5em;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledLegend = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const CustomTooltip = ({ active, payload, label, currency = 'GHS' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid ${({ theme }) => theme.colors.border}',
          padding: '10px',
          fontSize: '14px',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
          fontFamily: 'Proxima Nova',
          fontWeight: 500,
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>{label}</p>
        {payload.map((entry: any, index: number) => {
          if (entry.dataKey === 'Net margin %') {
            return (
              <p key={`item-${index}`} style={{ color: entry.color, margin: '4px 0 0 0' }}>
                {`${entry.name}: ${entry.value.toFixed(2)}%`}
              </p>
            );
          } else {
            const value = entry.value;
            let formattedValue = '';
            
            if (value >= 1000000000) {
              formattedValue = `${(value / 1000000000).toFixed(2)}B ${currency}`;
            } else if (value >= 1000000) {
              formattedValue = `${(value / 1000000).toFixed(2)}M ${currency}`;
            } else if (value >= 1000) {
              formattedValue = `${(value / 1000).toFixed(2)}K ${currency}`;
            } else {
              formattedValue = `${value.toFixed(2)} ${currency}`;
            }
            
            return (
              <p key={`item-${index}`} style={{ color: entry.color, margin: '4px 0 0 0' }}>
                {`${entry.name}: ${formattedValue}`}
              </p>
            );
          }
        })}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <StyledLegend>
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '20px 0 0 0',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        fontFamily: 'Proxima Nova',
        fontWeight: 500,
        fontSize: '14px',
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {entry.dataKey === 'Net margin %' ? (
            <svg width="20" height="10" style={{ marginRight: '5px' }}>
              <line x1="0" y1="5" x2="20" y2="5" stroke={entry.color} strokeWidth="2" />
            </svg>
          ) : (
            <svg width="10" height="10" style={{ marginRight: '5px' }}>
              <rect x="0" y="0" width="10" height="10" fill={entry.color} />
            </svg>
          )}
          <span>{entry.value}</span>
        </li>
      ))}
      </ul>
      </StyledLegend>
  );
};

interface PerformanceChartProps {
  financialData?: Financial | null;
  annualData?: PerformanceDataItem[];
  title?: string;
  height?: number;
  colors?: typeof DEFAULT_COLORS;
  companyId?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  financialData,
  annualData,
  title = 'Financial Performance',
  height = 350,
  colors = DEFAULT_COLORS,
  companyId = ''
}) => {
  const transformedData = useMemo(() => {
    return transformFinancialDataForChart(financialData || null);
  }, [financialData]);

  const hasAnnualData = useMemo(() => {
    if (annualData && annualData.length > 0) {
      return annualData.some(item => item.Revenue > 0 || item['Net income'] > 0);
    }
    return transformedData.annualData.some(item => item.Revenue > 0 || item['Net income'] > 0);
  }, [annualData, transformedData.annualData]);

  const safeAnnualData = useMemo(() => {
    if (annualData && annualData.length > 0) {
      return annualData.filter(item => item.Revenue > 0 || item['Net income'] > 0);
    }
    return transformedData.annualData.filter(item => item.Revenue > 0 || item['Net income'] > 0);
  }, [annualData, transformedData.annualData]);

  const data = safeAnnualData;

  const calculateYAxisDomain = (dataKey: keyof PerformanceDataItem, isPercentage = false) => {
    const values = data.map(item => item[dataKey] as number);
    
    if (values.length === 0) {
      return isPercentage ? [0, 10] : [0, 100];
    }
    
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    
    if (isPercentage) {
      const padding = Math.max(Math.abs(maxValue), Math.abs(minValue)) * 0.2;
      return [Math.min(minValue - padding, 0), maxValue + padding];
    } else {
      const padding = Math.max(Math.abs(maxValue), Math.abs(minValue)) * 0.1;
      return [Math.min(minValue - padding, 0), maxValue + padding];
    }
  };

  const yAxisLeftDomain = calculateYAxisDomain('Net margin %', true);
  const yAxisRightDomain = calculateYAxisDomain('Revenue');

  const getYAxisFormatter = () => {
    if (data.length === 0) {
      return (value: number) => value.toFixed(0);
    }
    
    const maxRevenue = Math.max(...data.map(item => item.Revenue));
    
    if (maxRevenue >= 1000000000) {
      return (value: number) => `${(value / 1000000000).toFixed(1)}B`;
    } else if (maxRevenue >= 1000000) {
      return (value: number) => `${(value / 1000000).toFixed(1)}M`;
    } else if (maxRevenue >= 1000) {
      return (value: number) => `${(value / 1000).toFixed(1)}K`;
    } else {
      return (value: number) => value.toFixed(0);
    }
  };

  const yAxisFormatter = getYAxisFormatter();

  if (!hasAnnualData) {
    return (
      <ChartContainer>
        <ChartHeader>
          <Title>Financial Performance</Title>
        </ChartHeader>
        <div style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '${({ theme }) => theme.colors.text}',
          fontFamily: 'Proxima Nova',
          padding: '20px',
          textAlign: 'center'
        }}>
          No financial data available {companyId ? `for ${companyId}` : ''}
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartHeader>
        <Title>
          {title}
        </Title>
      </ChartHeader>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
            barCategoryGap="15%" 
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="${({ theme }) => theme.colors.border}" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={{ stroke: '${({ theme }) => theme.colors.border}' }}
              tick={{ fontSize: 12, fontFamily: 'Proxima Nova', fontWeight: 700, fill: '#404040ff' }}
              padding={{ left: 0, right: 0 }}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              domain={yAxisLeftDomain}
              tickCount={5}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontFamily: 'Proxima Nova', fontWeight: 700, fill: '#404040ff' }}
              width={50}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={yAxisFormatter}
              domain={yAxisRightDomain}
              tickCount={5}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontFamily: 'Proxima Nova', fontWeight: 700, fill: '#404040ff' }}
              width={60}
            />

            <ReferenceLine y={0} yAxisId="left" stroke="${({ theme }) => theme.colors.border}" strokeWidth={1} />
            <ReferenceLine y={0} yAxisId="right" stroke="${({ theme }) => theme.colors.border}" strokeWidth={1} />

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            <Bar yAxisId="right" dataKey="Revenue" fill={colors.Revenue} barSize={40} />
            <Bar yAxisId="right" dataKey="Net income" fill={colors['Net income']} barSize={40} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Net margin %"
              stroke={colors['Net margin %']}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontFamily: 'Proxima Nova',
          padding: '20px',
          textAlign: 'center'
        }}>
          No annual financial data available
        </div>
      )}
    </ChartContainer>
  );
};

export default PerformanceChart;