'use client'

import React from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = {
  'Network Services': '#4285F4',
  'Digital and Fintech': '#4DC6B5',
  'Interconnect and Roaming': '#F4B742',
  'Mobile Devices': '#8A2BE2',
  'Interest': '#F17100',
  'Other': '#A9A9A9',
  'Airtime and Subscription': '#FF0000',
  'Data': '#008000',
  'Digital': '#0000FF',
  'Devices': '#FF00FF',
  'Short Messaging Service': '#00FFFF',
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: inherit, sans-serif;
  font-weight: 500;

  *:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .recharts-wrapper,
  .recharts-wrapper:focus,
  svg,
  svg:focus,
  .recharts-surface,
  .recharts-surface:focus,
  .recharts-legend-wrapper,
  .recharts-legend-wrapper:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .recharts-bar-rectangle {
    border-radius: 2px;
  }
  
  .recharts-legend-item text {
    font-family: inherit, sans-serif !important;
    font-weight: 500 !important;
  }

  .recharts-tooltip-cursor {
    fill: transparent !important;
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: '#fff', 
        border: '1px solid #ccc', 
        padding: '10px', 
        fontSize: '14px', 
        boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
        fontFamily: inherit,
        fontWeight: 500,
      }}>
        <p style={{ margin: 0 }}>{`Year: ${label}`}</p> 
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color, margin: '4px 0 0 0' }}>
            {`${entry.name}: ${entry.value.toFixed(2)} B`}
          </p>
        ))}
        <p style={{ margin: '8px 0 0 0', borderTop: '1px solid #eee', paddingTop: '4px' }}>
          {`Total: ${payload.reduce((acc: number, curr: any) => acc + curr.value, 0).toFixed(2)} B`}
        </p>
      </div>
    );
  }

  return null;
};

interface ChartDataItem {
  year: number;
  [key: string]: number;
}

interface SourceChartProps {
  data?: ChartDataItem[];
  height?: number;
  maxYears?: number;
}

const defaultEmptyData: ChartDataItem[] = [
  { year: new Date().getFullYear() - 3, 'No Data': 0 },
  { year: new Date().getFullYear() - 2, 'No Data': 0 },
  { year: new Date().getFullYear() - 1, 'No Data': 0 },
  { year: new Date().getFullYear(), 'No Data': 0 },
];

const SourceChart: React.FC<SourceChartProps> = ({ 
  data, 
  height = 400, 
  maxYears = 4 
}) => {
  const safeData = Array.isArray(data) && data.length > 0 ? data : defaultEmptyData;
  const filteredChartData = safeData.slice(-maxYears);
  const firstItem = filteredChartData[0] || {};
  const allDataKeys = Object.keys(firstItem).filter(key => key !== 'year');
  const visibleBarKeys = allDataKeys.filter(key => 
    filteredChartData.some(item => item[key] > 0)
  );

  const maxYDomain = Math.max(
    ...filteredChartData.map(item => 
      visibleBarKeys.reduce((sum, key) => sum + (item[key] || 0), 0)
    )
  ) * 1.1;

  const yDomain = maxYDomain > 0 ? [0, maxYDomain] : [0, 100];

  const getColorForSource = (source: string) => {
    if (COLORS[source as keyof typeof COLORS]) {
      return COLORS[source as keyof typeof COLORS];
    }
    
    const fallbackColors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const hash = source.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return fallbackColors[Math.abs(hash) % fallbackColors.length];
  };

  return (
    <ChartWrapper style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredChartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap="15%"
        >
          <CartesianGrid 
            stroke="#eee" 
            vertical={false} 
            strokeDasharray="3 3" 
          /> 
          
          <XAxis 
            dataKey="year" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 14, fontFamily: inherit, fontWeight: 500 }}
          />

          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#000"
            domain={yDomain}
            tickFormatter={(value) => `${(value / 100).toFixed(2)} B`} 
            tickLine={false} 
            axisLine={false} 
            tick={{ fontSize: 14, fontFamily: inherit, fontWeight: 500 }}
          />
          
          <Tooltip content={<CustomTooltip />} />

          <Legend 
            wrapperStyle={{ paddingTop: '20px' }} 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
          />

          {visibleBarKeys.length > 0 ? (
            visibleBarKeys.map((key) => (
              <Bar 
                key={key} 
                dataKey={key} 
                stackId="a" 
                fill={getColorForSource(key)} 
                yAxisId="right" 
                isAnimationActive={false}
              />
            ))
          ) : (
            <Bar 
              key="no-data" 
              dataKey="No Data" 
              stackId="a" 
              fill="#A9A9A9" 
              yAxisId="right" 
              isAnimationActive={false}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default SourceChart;