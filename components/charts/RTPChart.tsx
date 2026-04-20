'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { WaterfallDataItem, generateWaterfallData } from './waterfallData';

interface WaterfallChartProps {
  annualData?: WaterfallDataItem[];
  semiannualData?: WaterfallDataItem[];
  title?: string;
  height?: number;
  showSegmentedControl?: boolean;
  defaultView?: 'Annual' | 'Semiannual';
}

const ChartContainer = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  font-family: inherit, sans-serif;
  font-weight: 500;
  color: #333;
  outline: none;

  .recharts-tooltip-cursor {
    fill: transparent !important;
  }

  .recharts-wrapper:focus {
    outline: none;
  }

  .recharts-surface:focus {
    outline: none;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0;
`;

const Title = styled.h3`
  font-family: inherit, sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const SegmentedControl = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 10px;
`;

const SegmentButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 15px;
  border: none;
  background-color: ${(props) => (props.$isActive ? '#e0e0e0' : 'white')};
  color: ${(props) => (props.$isActive ? '#333' : '#666')};
  cursor: pointer;
  font-family: inherit, sans-serif;
  font-weight: 500;
  font-size: 0.9em;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#e0e0e0' : '#f5f5f5')};
  }
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const actualValueBar = payload.find((entry: any) => entry.dataKey === 'value');
    if (!actualValueBar) return null;

    const value = actualValueBar.payload.value;
    const formattedValue = `${(value / 100).toFixed(2)} B`;
    const categoryColor = actualValueBar.payload.fill;

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
        <p style={{ color: categoryColor, margin: '4px 0 0 0' }}>
          {`${actualValueBar.name}: ${formattedValue}`}
        </p>
      </div>
    );
  }
  return null;
};

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  
  const getMaxCharsPerLine = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 6 : 10;
  };

  const splitTextIntoChunks = (text: string, maxLength: number): string[] => {
    const chunks: string[] = [];
    let currentChunk = '';

    for (let i = 0; i < text.length; i++) {
      currentChunk += text[i];
      
      if (currentChunk.length === maxLength || i === text.length - 1) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
    }

    return chunks;
  };

  const splitTextIntoLines = (text: string, maxCharsPerLine: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (word.length > maxCharsPerLine) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        const wordChunks = splitTextIntoChunks(word, maxCharsPerLine);
        lines.push(...wordChunks);
      } else {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        
        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
          }
          currentLine = word;
        }
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  const maxCharsPerLine = getMaxCharsPerLine();
  const lines = splitTextIntoLines(payload.value, maxCharsPerLine);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        fontSize={12}
        fontFamily="cheltenham-normal"
        fontWeight={500}
      >
        {lines.map((line, lineIndex) => (
          <tspan 
            x={0} 
            dy={lineIndex === 0 ? 8 : 12} 
            key={lineIndex}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

const defaultAnnualData: WaterfallDataItem[] = [
  { category: 'Revenue', amount: 0 },
  { category: 'COGS', amount: 0 },
  { category: 'Gross profit', amount: 0 },
  { category: 'Op expenses', amount: 0 },
  { category: 'Op income', amount: 0 },
  { category: 'Non-Op income/expenses', amount: 0 },
  { category: 'Taxes & Other', amount: 0 },
  { category: 'Net income', amount: 0 },
];

const defaultSemiannualData: WaterfallDataItem[] = [
  { category: 'Revenue', amount: 0 },
  { category: 'COGS', amount: 0 },
  { category: 'Gross profit', amount: 0 },
  { category: 'Op expenses', amount: 0 },
  { category: 'Op income', amount: 0 },
  { category: 'Non-Op income/expenses', amount: 0 },
  { category: 'Taxes & Other', amount: 0 },
  { category: 'Net income', amount: 0 },
];

const WaterfallChart: React.FC<WaterfallChartProps> = ({ 
  annualData = defaultAnnualData,
  semiannualData = defaultSemiannualData,
  title = 'Revenue to profit conversion',
  height = 350,
  showSegmentedControl = true,
  defaultView = 'Semiannual'
}) => {
  const [viewType, setViewType] = useState<'Annual' | 'Semiannual'>(defaultView);
  const [isMobile, setIsMobile] = useState(false);
  
  const safeAnnualData = Array.isArray(annualData) && annualData.length > 0 ? annualData : defaultAnnualData;
  const safeSemiannualData = Array.isArray(semiannualData) && semiannualData.length > 0 ? semiannualData : defaultSemiannualData;
  
  const data = viewType === 'Annual' ? generateWaterfallData(safeAnnualData) : generateWaterfallData(safeSemiannualData);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getBarCategoryGap = () => {
    return isMobile ? '25%' : '15%';
  };

  const getXAxisHeight = () => {
    return isMobile ? 85 : 72;
  };

  return (
    <ChartContainer tabIndex={-1}>
      <ChartHeader>
        <Title>
          {title}
        </Title>
        {showSegmentedControl && (
          <SegmentedControl>
            <SegmentButton
              $isActive={viewType === 'Annual'}
              onClick={() => setViewType('Annual')}
            >
              Annual
            </SegmentButton>
            <SegmentButton
              $isActive={viewType === 'Semiannual'}
              onClick={() => setViewType('Semiannual')}
            >
              Semiannual
            </SegmentButton>
          </SegmentedControl>
        )}
      </ChartHeader>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 48 }}
          barCategoryGap={getBarCategoryGap()}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={CustomTick}
            height={getXAxisHeight()}
          />
          <YAxis
            orientation="right"
            tickFormatter={(value) => `${(value / 100).toFixed(2)} B`}
            domain={[0, 120]}
            tickCount={7}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontFamily: inherit, fontWeight: 500, fill: '#666' }}
            stroke="#ccc"
          />

          <ReferenceLine y={0} stroke="#e7e7e7" strokeWidth={1} />

          <Tooltip 
            content={<CustomTooltip />}
            cursor={false}
          />

          <Bar 
            dataKey="value" 
            fill={(data) => data.fill}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default WaterfallChart;