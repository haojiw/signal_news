"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { ChartDataPoint } from '@/types/news';
import { CHART_TIME_RANGES, ChartTimeRange } from '@/lib/config';
import { SignalDirection } from './ProbabilityDisplay';

interface MarketChartProps {
  data: ChartDataPoint[];
  direction?: SignalDirection;
  height?: number;
  showTimeRangeSelector?: boolean;
  className?: string;
}

function getChartColor(direction: SignalDirection): string {
  switch (direction) {
    case 'up':
      return 'var(--signal-up)';
    case 'down':
      return 'var(--signal-down)';
    default:
      return 'var(--signal-neutral)';
  }
}

export function MarketChart({
  data,
  direction = 'neutral',
  height = 240,
  showTimeRangeSelector = true,
  className,
}: MarketChartProps) {
  const [timeRange, setTimeRange] = useState<ChartTimeRange>('1D');
  const chartColor = getChartColor(direction);

  return (
    <div className={cn("w-full", className)}>
      <div 
        className="border-t border-b border-border py-6"
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              stroke="var(--muted-foreground)"
              style={{ 
                fontSize: '0.5625rem', 
                fontFamily: 'Space Mono, monospace', 
                letterSpacing: '0.05em' 
              }}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              style={{ 
                fontSize: '0.5625rem', 
                fontFamily: 'Space Mono, monospace', 
                letterSpacing: '0.05em' 
              }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              dx={-8}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.6875rem',
                padding: '6px 10px',
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
            />
            <Line
              type="monotone"
              dataKey="probability"
              stroke={chartColor}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showTimeRangeSelector && (
        <div className="flex gap-8 justify-center mt-4">
          {CHART_TIME_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "font-mono text-[0.6875rem] tracking-widest transition-all duration-300",
                timeRange === range
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
