'use client';

import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: any; 
}

interface IndexChartProps {
  data: ChartDataPoint[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  xAxisOptions?: {
    hide?: boolean;
    orientation?: 'top' | 'bottom';
    tickFormatter?: (value: any, index: number) => string;
    interval?: number | 'preserveStartEnd' | 'preserveStart' | 'preserveEnd';
  };
  yAxisOptions?: {
    hide?: boolean;
    orientation?: 'left' | 'right';
    tickFormatter?: (value: any, index: number) => string;
    domain?: [number | string, number | string];
  };
  lineOptions?: {
    strokeWidth?: number;
    showDot?: boolean;
    dotSize?: number;
    curveType?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
  };
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const ChartWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 0.5rem;
  border-radius: 8px;
`;

export default function IndexChart({
  data,
  color = '#2a5599',
  height = 300,
  showGrid = true,
  showTooltip = true,
  xAxisOptions = {},
  yAxisOptions = {},
  lineOptions = {},
  margin = { top: 5, right: 20, bottom: 5, left: 0 },
}: IndexChartProps) {
  return (
    <ChartWrapper height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={margin}>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f0f0f0" 
            />
          )}

        <XAxis
            axisLine={false}
            tickLine={false} 
            dataKey="date"
            orientation={xAxisOptions.orientation || 'bottom'}
            tickFormatter={xAxisOptions.tickFormatter}
            interval={xAxisOptions.interval}
            hide={xAxisOptions.hide}
          />

        <YAxis
            axisLine={false}
            tickLine={false} 
            orientation={yAxisOptions.orientation || 'right'}
            tick={{ dx: 10 }}
            tickFormatter={yAxisOptions.tickFormatter}
            domain={yAxisOptions.domain || ['auto', 'auto']}
            hide={yAxisOptions.hide}
          />

          {showTooltip && <Tooltip />}

          <Line
            type={lineOptions.curveType || 'monotone'}
            dataKey="value"
            stroke={color}
            strokeWidth={lineOptions.strokeWidth || 2}
            dot={lineOptions.showDot ? { 
              r: lineOptions.dotSize || 4,
              fill: color,
              strokeWidth: 1,
              stroke: '#fff'
            } : false}
            activeDot={{
              r: (lineOptions.dotSize || 4) + 2,
              fill: color,
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}