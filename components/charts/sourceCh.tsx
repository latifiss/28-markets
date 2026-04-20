'use client'

import React from 'react';
import styled, { css } from 'styled-components';
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

const chartData = [
  {
    year: 2018,
    'Network Services': 0,
    'Digital and Fintech': 0,
    'Interconnect and Roaming': 0,
    'Mobile Devices': 0,
    'Interest': 0,
    'Other': 0,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2019,
    'Network Services': 0,
    'Digital and Fintech': 0,
    'Interconnect and Roaming': 0,
    'Mobile Devices': 0,
    'Interest': 0,
    'Other': 0,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2020,
    'Network Services': 125,
    'Digital and Fintech': 10,
    'Interconnect and Roaming': 20,
    'Mobile Devices': 5,
    'Interest': 10,
    'Other': 5,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2021,
    'Network Services': 120,
    'Digital and Fintech': 15,
    'Interconnect and Roaming': 15,
    'Mobile Devices': 8,
    'Interest': 10,
    'Other': 7,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2022,
    'Network Services': 150,
    'Digital and Fintech': 15,
    'Interconnect and Roaming': 10,
    'Mobile Devices': 5,
    'Interest': 8,
    'Other': 10,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2023,
    'Network Services': 160,
    'Digital and Fintech': 20,
    'Interconnect and Roaming': 15,
    'Mobile Devices': 10,
    'Interest': 5,
    'Other': 15,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
  {
    year: 2024,
    'Network Services': 128,
    'Digital and Fintech': 25,
    'Interconnect and Roaming': 18,
    'Mobile Devices': 10,
    'Interest': 5,
    'Other': 10,
    'Airtime and Subscription': 0,
    'Data': 0,
    'Digital': 0,
    'Devices': 0,
    'Short Messaging Service': 0,
  },
];

const filteredChartData = chartData.slice(-4);

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

const SourceChart = () => {
  const barKeys = Object.keys(filteredChartData[0]).filter(
    (key) => key !== 'year' && filteredChartData.some(d => d[key as keyof typeof d] > 0)
  );

  const visibleBarKeys = barKeys.filter(key => 
    filteredChartData.some(item => item[key as keyof typeof item] > 0)
  );

  const maxYDomain = 240;

  return (
    <ChartWrapper>
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
            domain={[0, maxYDomain]} 
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

          {visibleBarKeys.map((key) => (
            <Bar 
              key={key} 
              dataKey={key} 
              stackId="a" 
              fill={COLORS[key as keyof typeof COLORS]} 
              yAxisId="right" 
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default SourceChart;