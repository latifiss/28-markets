'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const industryData = [
  { name: 'Technology', market_cap: 350, daily_return: 2.5 },
  { name: 'Financial Services', market_cap: 220, daily_return: -0.7 },
  { name: 'Healthcare', market_cap: 180, daily_return: 1.8 },
  { name: 'Energy', market_cap: 150, daily_return: 3.2 },
  { name: 'Consumer Discretionary', market_cap: 100, daily_return: -1.5 },
  { name: 'Industrials', market_cap: 90, daily_return: 0.9 },
  { name: 'Communication Services', market_cap: 80, daily_return: 0.1 },
  { name: 'Real Estate', market_cap: 70, daily_return: -2.3 },
  { name: 'Utilities', market_cap: 60, daily_return: 0.4 },
  { name: 'Materials', market_cap: 50, daily_return: 1.2 },
  { name: 'Consumer Staples', market_cap: 40, daily_return: -0.2 },
  { name: 'Semiconductors', market_cap: 30, daily_return: 4.0 },
  { name: 'Aerospace & Defense', market_cap: 20, daily_return: -1.0 },
];

const colorScale = d3.scaleLinear<string>()
  .domain([-3, 0, 3])
  .range(['#FF0606', '#3C3C3C', '#13D14C']);

const HeatmapContainer = styled.div`
  width: 100%;
  height: 90vh;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  color: #f0f0f0;
  font-family: 'Inter', sans-serif;
`;

const HeatmapHeader = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;

  h3 {
    font-weight: 700;
    font-size: 1.5em;
    margin: 0;
    color: #000000;
    font-family: inherit, sans-serif;
  }
`;

const TreemapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
`;

const TreemapTile = styled.div<{ $x: number, $y: number, $width: number, $height: number, $color: string }>`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.$color};
  border: 1px solid #1a1a1a;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.1s ease;
  
  &:hover {
    transform: scale(1.01);
    z-index: 10;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  & > span {
    text-align: center;
    line-height: 1.1;
    font-size: min(${(props) => props.$height / 8}px, ${(props) => props.$width / 8}px, 14px);
    font-weight: 600;
    color: #f0f0f0;
    opacity: ${(props) => (props.$width > 50 && props.$height > 30 ? 1 : 0)};
  }
`;

const LegendBar = styled.div`
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 20px 0;
`;

const GradientDiv = styled.div`
  width: 100%;
  padding: 0 0;
  box-sizing: border-box;
  div {
      width: 100%;
      height: 15px;
      background: linear-gradient(to right, #FF0606, #3C3C3C, #13D14C);
      border-radius: 0px;
      margin-bottom: 5px;
  }
`;

const GradientLabels = styled.div`
  width: 100%;
  padding: 0 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 500;
  color: #444;
`;

const Heatmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{ x: number, y: number, content: string } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const treemapRoot = d3.hierarchy({ children: industryData })
    .sum((d: any) => d.market_cap)
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const treemapGenerator = d3.treemap()
    .tile(d3.treemapSquarify)
    .size([dimensions.width, dimensions.height])
    .padding(0);

  const treemapNodes = treemapGenerator(treemapRoot).leaves();

  const handleMouseMove = (event: React.MouseEvent, node: d3.HierarchyRectangularNode<any>) => {
    const industry = node.data;
    const content = `${industry.name}\n${industry.daily_return.toFixed(2)}%`;
    setTooltip({
      x: event.clientX + 10,
      y: event.clientY + 10,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <HeatmapContainer>
      <HeatmapHeader>
        <h3>Industry Performance</h3>
      </HeatmapHeader>
      
      <LegendBar>
          <GradientDiv>
              <div />
          </GradientDiv>
        <GradientLabels>
          <span>&le; -3.0%</span>
          <span>-1.0%</span>
          <span>0.0%</span>
          <span>1.0%</span>
          <span>&ge; 3.0%</span>
        </GradientLabels>
      </LegendBar>

      <TreemapWrapper ref={containerRef}>
        {dimensions.width > 0 && treemapNodes.map((node) => {
          const industry = node.data;
          const color = colorScale(industry.daily_return);
          
          const x = node.x0;
          const y = node.y0;
          const width = node.x1 - node.x0;
          const height = node.y1 - node.y0;

          return (
            <TreemapTile
              key={industry.name}
              $x={x}
              $y={y}
              $width={width}
              $height={height}
              $color={color}
              onMouseMove={(e) => handleMouseMove(e, node)}
              onMouseLeave={handleMouseLeave}
              onClick={() => console.log(`Clicked on ${industry.name}`)}
            >
              <span>{industry.name}</span>
              <span>{industry.daily_return.toFixed(2)}%</span>
            </TreemapTile>
          );
        })}
      </TreemapWrapper>
      
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            padding: '8px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#1a1a1a',
            borderRadius: '0px',
            border: '1px solid #e7e7e7',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
            zIndex: 100,
            fontSize: '12px',
            fontFamily: inherit,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </HeatmapContainer>
  );
};

export default Heatmap;