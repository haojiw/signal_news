"use client";

import { ChartDataPoint, ChartTimeframe } from "@/types";
import { useState, useRef, useEffect } from "react";

interface ProbabilityChartProps {
  data: ChartDataPoint[];
  direction: "up" | "down";
}

export function ProbabilityChart({ data, direction }: ProbabilityChartProps) {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("1D");
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const timeframes: ChartTimeframe[] = ["1D", "1W", "1M", "ALL"];
  
  // Filter data based on timeframe (simplified for MVP)
  const filteredData = data.slice(-(timeframe === "1D" ? 48 : timeframe === "1W" ? 168 : data.length));
  
  const width = 340;
  const height = 180;
  const padding = { top: 20, right: 40, bottom: 30, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = filteredData.map((d) => d.value);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values, 100);
  const valueRange = maxValue - minValue || 1;

  const getX = (index: number) => 
    padding.left + (index / (filteredData.length - 1)) * chartWidth;
  
  const getY = (value: number) => 
    padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  // Create path for line chart
  const linePath = filteredData
    .map((point, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(point.value)}`)
    .join(" ");

  // Create path for area fill
  const areaPath = `${linePath} L ${getX(filteredData.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  const strokeColor = direction === "up" ? "var(--signal-up)" : "var(--signal-down)";

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - padding.left;
    const index = Math.round((x / chartWidth) * (filteredData.length - 1));
    if (index >= 0 && index < filteredData.length) {
      setHoveredPoint(filteredData[index]);
    }
  };

  return (
    <div className="w-full">
      {/* Chart */}
      <div className="border border-divider p-2 bg-card-bg">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={getY(value)}
                x2={width - padding.right}
                y2={getY(value)}
                stroke="var(--divider)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <text
                x={width - padding.right + 5}
                y={getY(value) + 4}
                fill="var(--accent)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path
            d={areaPath}
            fill={strokeColor}
            fillOpacity="0.1"
          />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            className="chart-glow"
          />

          {/* Current value dot */}
          <circle
            cx={getX(filteredData.length - 1)}
            cy={getY(filteredData[filteredData.length - 1]?.value || 0)}
            r="4"
            fill={strokeColor}
          />

          {/* Time labels */}
          <text
            x={padding.left}
            y={height - 8}
            fill="var(--accent)"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            8:00
          </text>
          <text
            x={width / 2}
            y={height - 8}
            fill="var(--accent)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            16:00
          </text>
          <text
            x={width - padding.right - 20}
            y={height - 8}
            fill="var(--accent)"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            now
          </text>
        </svg>

        {/* Hover tooltip */}
        {hoveredPoint && (
          <div className="text-center mt-2 font-mono text-sm text-accent">
            {hoveredPoint.time}: <span style={{ color: strokeColor }}>{hoveredPoint.value.toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Timeframe selector */}
      <div className="flex justify-center gap-6 mt-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`font-mono text-sm px-2 py-1 transition-colors ${
              timeframe === tf
                ? "text-foreground border-b-2 border-signal-up"
                : "text-accent hover:text-foreground"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}
