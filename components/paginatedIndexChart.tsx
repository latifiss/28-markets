'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    ReferenceDot,
    ReferenceLine,
    Label
} from 'recharts';

export interface ChartDataPoint {
    date: string;
    value: number;
}

export type TimePeriod =
    | '1D'
    | '5D'
    | '1M'
    | '6M'
    | 'YTD'
    | '1Y'
    | '5Y'
    | 'ALL';

interface PaginatedIndexChartProps {
    data: ChartDataPoint[];
    initialPeriod?: TimePeriod;
    onTimePeriodChange: (period: TimePeriod) => void;
    color?: string;
    height?: number;
    showGrid?: boolean;
    showTooltip?: boolean;
    xAxisOptions?: any;
    yAxisOptions?: any;
    lineOptions?: any;
    margin?: any;
    tooltipFormatter?: any;
}

const TIME_PERIODS = [
    { label: '1M', value: '1M' },
    { label: '6M', value: '6M' },
    { label: 'YTD', value: 'YTD' },
    { label: '1Y', value: '1Y' },
    { label: '5Y', value: '5Y' },
    { label: 'ALL', value: 'ALL' }
];

const ChartContainer = styled.div`
    width: 100%;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'Proxima Nova', serif;

    @media only screen and (max-width: 576px) { 
    padding: 0rem;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) { 
    padding: 0rem;
  }
`;

const TabBar = styled.div`
    display: flex;
    overflow-x: auto;
    margin-bottom: 12px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 8px 12px;
    border-radius: 99px;
    margin-right: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Proxima Nova', serif;
    border: ${({ theme }) => theme.colors.border};
    color: ${({ $isActive, theme }) => 
        $isActive ? '#fff' : theme.colors.text
    };
    background-color: ${({ $isActive }) => ($isActive ? '#000' : 'transparent')};
    transition: all 0.2s;
`;

const ChartWrapper = styled.div<{ height: number }>`
    width: 100%;
    height: ${({ height }) => height}px;
`;

export default function PaginatedIndexChart({
    data,
    initialPeriod = '1M',
    onTimePeriodChange,
    color = '#13D14C',
    height = 300,
    showGrid = true,
    showTooltip = true,
    xAxisOptions = {},
    yAxisOptions = {},
    lineOptions = {},
    margin = { top: 5, right: 40, bottom: 20, left: 0 },
    tooltipFormatter
}: PaginatedIndexChartProps) {
    const [activePeriod, setActivePeriod] = useState(initialPeriod);

    useEffect(() => {
        onTimePeriodChange(initialPeriod);
    }, [initialPeriod, onTimePeriodChange]);

    const handleTabClick = (period: TimePeriod) => {
        setActivePeriod(period);
        onTimePeriodChange(period);
    };

    const last = data[data.length - 1];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const formattedValue = tooltipFormatter
                ? tooltipFormatter(value, payload[0].name, payload[0])
                : value;

            return (
                <div
                    style={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '4px',
                        fontFamily: 'Proxima Nova',
                        fontSize: '14px'
                    }}
                >
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
                    <p style={{ margin: 0, color: payload[0].stroke }}>
                        {payload[0].name}: {formattedValue}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ChartContainer>
            <TabBar>
                {TIME_PERIODS.map((p) => (
                    <TabButton
                        key={p.value}
                        $isActive={activePeriod === p.value}
                        onClick={() => handleTabClick(p.value)}
                    >
                        {p.label}
                    </TabButton>
                ))}
            </TabBar>

            <ChartWrapper height={height}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 40, bottom: 50, left: 0 }}>
                        {showGrid && (
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        )}

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={xAxisOptions.tickFormatter}
                            interval={xAxisOptions.interval}
                            angle={0}
                            textAnchor={xAxisOptions.tickRotation ? 'end' : 'middle'}
                            style={{ fontFamily: 'Proxima Nova', fontSize: 12, fontWeight: 600 }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={yAxisOptions.tickFormatter}
                            domain={['auto', 'auto']}
                            style={{ fontFamily: 'Proxima Nova', fontSize: 12, fontWeight: 600, color: '#6b6b6b' }}
                        />

                        {showTooltip && <Tooltip content={<CustomTooltip />} />}

                        <Line
                            type={lineOptions.curveType || 'monotone'}
                            dataKey="value"
                            name="Price"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                        />

                        {/* Highlight Last Point */}
                        {last && (
                            <>
                                <ReferenceDot x={last.date} y={last.value} r={5} fill={color} stroke="#fff" strokeWidth={2}>
                                    <Label
                                        value={last.value}
                                        position="right"
                                        fill={color}
                                        fontWeight="bold"
                                        fontSize={12}
                                        height={20}
                                        rx={4}
                                        ry={4}
                                        style={{ fontFamily: 'Proxima Nova' }}
                                    />
                                </ReferenceDot>

                                <ReferenceLine x={last.date} stroke={color} strokeDasharray="4 4" />
                            </>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </ChartWrapper>
        </ChartContainer>
    );
}
