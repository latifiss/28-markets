'use client';

import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const DEFAULT_COLORS = {
  '2025': '#4285F4',
  '2023': '#F1A600',
  '2024': '#4CAF50',
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: inherit, sans-serif;
  font-weight: 500;

  .recharts-legend-item text {
    font-family: inherit, sans-serif !important;
    font-weight: 500 !important;
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          fontSize: '14px',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
          fontFamily: inherit,
          fontWeight: 500,
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color, margin: '4px 0 0 0' }}>
            {`${entry.name}: ${entry.value.toFixed(2)}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ChartDataItem {
  name: string;
  [key: string]: number | string;
}

interface SeasonalsChartProps {
  data?: ChartDataItem[];
  height?: number;
  colors?: { [key: string]: string };
  yAxisDomain?: [number, number];
  showReferenceLine?: boolean;
}

const defaultEmptyData: ChartDataItem[] = [
  { name: 'Jan', 'No Data': 0 },
  { name: 'Feb', 'No Data': 0 },
  { name: 'Mar', 'No Data': 0 },
  { name: 'Apr', 'No Data': 0 },
  { name: 'May', 'No Data': 0 },
  { name: 'Jun', 'No Data': 0 },
  { name: 'Jul', 'No Data': 0 },
  { name: 'Aug', 'No Data': 0 },
  { name: 'Sep', 'No Data': 0 },
  { name: 'Oct', 'No Data': 0 },
  { name: 'Nov', 'No Data': 0 },
  { name: 'Dec', 'No Data': 0 },
];

const SeasonalsChart: React.FC<SeasonalsChartProps> = ({ 
  data, 
  height = 400, 
  colors = DEFAULT_COLORS,
  yAxisDomain = [-40, 80],
  showReferenceLine = true
}) => {
  const safeData = Array.isArray(data) && data.length > 0 ? data : defaultEmptyData;
  
  const dataKeys = Object.keys(safeData[0] || {}).filter(key => key !== 'name');
  const visibleDataKeys = dataKeys.filter(key => 
    safeData.some(item => item[key] !== 0)
  );

  const getColorForLine = (dataKey: string) => {
    return colors[dataKey] || DEFAULT_COLORS[dataKey as keyof typeof DEFAULT_COLORS] || '#4285F4';
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: inherit,
          fontWeight: 500,
          fontSize: '14px',
          flexWrap: 'wrap',
        }}
      >
        {payload.map((entry: any, index: number) => {
          const lastDataPoint = safeData[safeData.length - 1];
          const value = lastDataPoint ? lastDataPoint[entry.dataKey as keyof typeof lastDataPoint] : 0;

          return (
            <li
              key={`item-${index}`}
              style={{
                color: entry.color,
                display: 'flex',
                alignItems: 'center',
                margin: '2px 6px',
              }}
            >
              <svg width="8" height="8" style={{ marginRight: '4px' }}>
                <circle cx="4" cy="4" r="4" fill={entry.color} />
              </svg>
              <span>{entry.dataKey}</span>
              <span style={{ marginLeft: '4px' }}>
                {value !== undefined && typeof value === 'number' ? `(${value.toFixed(2)}%)` : ''}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ChartWrapper style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={safeData}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            stroke="#f5f5f5"
            strokeDasharray="0 0"
          />
          <CartesianGrid 
            vertical={true} 
            horizontal={false} 
            stroke="#f8f8f8"
            strokeDasharray="3 3" 
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: '#f0f0f0', strokeWidth: 1 }}
            tick={{ fontSize: 12, fontFamily: inherit, fontWeight: 500, fill: '#000' }}
            interval={0}
            minTickGap={5}
          />
          <YAxis
            orientation="right"
            tickFormatter={(value) => `${value.toFixed(0)}%`}
            domain={yAxisDomain}
            tickCount={7}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontFamily: inherit, fontWeight: 500, fill: '#000' }}
            width={40}
          />

          {showReferenceLine && <ReferenceLine y={0} stroke="#e0e0e0" strokeWidth={1} />}

          <Tooltip content={<CustomTooltip />} />
          
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '8px' }}
            content={<CustomLegend />}
          />

          {visibleDataKeys.length > 0 ? (
            visibleDataKeys.map((dataKey) => (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                stroke={getColorForLine(dataKey)}
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey="No Data"
              stroke="#A9A9A9"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default SeasonalsChart;