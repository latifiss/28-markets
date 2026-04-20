'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from 'recharts';

interface EarningDataPoint {
  period: string;
  reported: number;
  estimate: number;
  beatMissAmount?: number;
  beatMissStatus?: 'Beat' | 'Miss';
  isLatest?: boolean;
  dateLabel?: string;
}

const quarterlyData: EarningDataPoint[] = [
  { period: 'Q3 FY25', reported: 0.20, estimate: 0.15, beatMissAmount: 0.05, beatMissStatus: 'Beat' },
  { period: 'Q4 FY25', reported: 0.28, estimate: 0.17, beatMissAmount: 0.11, beatMissStatus: 'Beat' },
  { period: 'Q1 FY26', reported: 0.22, estimate: 0.21, beatMissAmount: 0.01, beatMissStatus: 'Beat' },
  { period: 'Q2 FY26', reported: 0.35, estimate: 0.28, beatMissAmount: 0.07, beatMissStatus: 'Beat' },
  { period: 'Q3 FY26', reported: 0.31, estimate: 0.31, isLatest: true, dateLabel: 'Dec 03' },
];

const annualData: EarningDataPoint[] = [
  { period: 'FY23', reported: 0.80, estimate: 0.75, beatMissAmount: 0.05, beatMissStatus: 'Beat' },
  { period: 'FY24', reported: 1.10, estimate: 1.00, beatMissAmount: 0.10, beatMissStatus: 'Beat' },
  { period: 'FY25', reported: 1.25, estimate: 1.20, beatMissAmount: 0.05, beatMissStatus: 'Beat' },
  { period: 'FY26', reported: 1.40, estimate: 1.35, beatMissAmount: 0.05, beatMissStatus: 'Beat' },
  { period: 'FY27', reported: 1.60, estimate: 1.60, isLatest: true, dateLabel: 'Jan 15' },
];

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: transparent;
  font-family: inherit, sans-serif;
  font-weight: 500;
  color: #333;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-family: inherit, sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  margin: 0;
  color: #000000;
  display: flex;
  align-items: center;

  .help-icon {
    font-size: 0.8em;
    margin-left: 8px;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #666;
  }
`;

const SegmentedControl = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const SegmentButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 15px;
  border: none;
  background-color: ${(props) => (props.$isActive ? '#303030' : 'white')};
  color: ${(props) => (props.$isActive ? 'white' : '#666')};
  cursor: pointer;
  font-family: inherit, sans-serif;
  font-weight: 500;
  font-size: 0.9em;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#303030' : '#f5f5f5')};
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0]?.payload;
    if (!dataPoint) return null;

    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e7e7e7',
          borderRadius: '0px',
          padding: '10px',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: inherit,
          fontWeight: 500,
          color: '#1a1a1a',
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>{dataPoint.period}</p>
        <p style={{ margin: '4px 0 0 0', color: '#13D14C' }}>Reported: {dataPoint.reported.toFixed(2)}</p>
        <p style={{ margin: '4px 0 0 0', color: '#f0f0f0' }}>Estimate: {dataPoint.estimate.toFixed(2)}</p>
        {dataPoint.beatMissStatus && (
          <p style={{ margin: '4px 0 0 0', color: dataPoint.beatMissStatus === 'Beat' ? '#13D14C' : '#FF0606' }}>
            {dataPoint.beatMissStatus} ${Math.abs(dataPoint.beatMissAmount || 0).toFixed(2)}
          </p>
        )}
        {dataPoint.dateLabel && (
          <p style={{ margin: '4px 0 0 0', color: '#666' }}>{dataPoint.dateLabel}</p>
        )}
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload, data } = props;
  const dataPoint = data.find((d: EarningDataPoint) => d.period === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12} fontFamily="cheltenham-normal">
        {payload.value}
      </text>
      {dataPoint && dataPoint.beatMissStatus && (
        <text
          x={0}
          y={0}
          dy={30}
          textAnchor="middle"
          fill={dataPoint.beatMissStatus === 'Beat' ? '#13D14C' : '#FF0606'}
          fontSize={12}
          fontFamily="franklin-normal"
        >
          {dataPoint.beatMissStatus} ${dataPoint.beatMissAmount?.toFixed(2)}
        </text>
      )}
      {dataPoint && dataPoint.isLatest && dataPoint.dateLabel && (
        <text
          x={0}
          y={0}
          dy={30}
          textAnchor="middle"
          fill="#666"
          fontSize={12}
          fontFamily="franklin-normal"
        >
          {dataPoint.dateLabel}
        </text>
      )}
    </g>
  );
};

const EarningChart = () => {
  const [viewType, setViewType] = useState<'Annual' | 'Quarterly'>('Quarterly');
  const data = viewType === 'Annual' ? annualData : quarterlyData;

  const latestEstimate = data.find(d => d.isLatest)?.estimate;
  const latestPeriodIndex = data.findIndex(d => d.isLatest);

  const yAxisTicks = [0.16, 0.21, 0.26, 0.31, 0.36];

  return (
    <ChartContainer>
      <ChartHeader>
        <Title>
          Earnings Per Share
        </Title>
        <SegmentedControl>
          <SegmentButton
            $isActive={viewType === 'Annual'}
            onClick={() => setViewType('Annual')}
          >
            Annual
          </SegmentButton>
          <SegmentButton
            $isActive={viewType === 'Quarterly'}
            onClick={() => setViewType('Quarterly')}
          >
            Quarterly
          </SegmentButton>
        </SegmentedControl>
      </ChartHeader>

      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            interval={0}
            height={60}
            tick={<CustomXAxisTick data={data} />}
            type="category"
          />
          <YAxis
            dataKey="reported"
            orientation="left"
            tickFormatter={(value) => value.toFixed(2)}
            domain={[yAxisTicks[0], yAxisTicks[yAxisTicks.length - 1]]}
            ticks={yAxisTicks}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontFamily: inherit, fontWeight: 500, fill: '#666' }}
            stroke="#e0e0e0"
          />

          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

          {latestEstimate !== undefined && (
            <ReferenceLine
              y={latestEstimate}
              stroke="#999"
              strokeDasharray="5 5"
              strokeWidth={1}
              yAxisId="left"
            >
              <LabelList
                dataKey="period"
                valueAccessor={(entry: any) => `Estimate +${entry.value?.toFixed(2)}`}
                position="top"
                offset={10}
                fill="#666"
                fontSize={12}
                fontFamily="cheltenham-normal"
                content={({ y, x, value }: any) => {
                    return <text x={x - 10} y={y} dy={-4} textAnchor="end" fill="#f0f0f0" fontSize={12} fontFamily="franklin-normal">
                                Q3 FY26 <tspan fill="#666">O Estimate +{value}</tspan>
                            </text>;
                }}
              />
            </ReferenceLine>
          )}

          {latestPeriodIndex !== -1 && (
            <ReferenceLine
              x={data[latestPeriodIndex].period}
              stroke="#e7e7e7"
              strokeDasharray="5 5"
              strokeWidth={1}
            />
          )}

          <Scatter name="Reported" data={data} fill="#13D14C" shape="circle" isAnimationActive={false} />
          <Scatter
            name="Estimate"
            data={data}
            fill="transparent"
            stroke="#f0f0f0"
            strokeWidth={2}
            shape="circle"
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default EarningChart;