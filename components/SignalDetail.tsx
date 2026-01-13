"use client";

import { useState } from 'react';
import { NewsSignal } from '@/types/news';
import { X, ExternalLink, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface SignalDetailProps {
  signal: NewsSignal;
  onClose: () => void;
}

type ChartTimeRange = '1D' | '1W' | '1M' | 'ALL';

export function SignalDetail({ signal, onClose }: SignalDetailProps) {
  const [timeRange, setTimeRange] = useState<ChartTimeRange>('1D');
  
  const changeDirection = signal.changePercent > 0 ? 'up' : signal.changePercent < 0 ? 'down' : 'neutral';
  
  const probabilityColor = changeDirection === 'up' 
    ? 'text-signal-up' 
    : changeDirection === 'down' 
    ? 'text-signal-down' 
    : 'text-signal-neutral';
  
  const chartColor = changeDirection === 'up' 
    ? 'var(--signal-up)' 
    : changeDirection === 'down' 
    ? 'var(--signal-down)' 
    : 'var(--signal-neutral)';
  
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: signal.headline,
        text: `${signal.probability}% ${signal.probabilityLabel} - ${signal.headline}`,
        url: window.location.href
      });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Minimal header */}
      <div className="sticky top-0 bg-background/98 backdrop-blur-sm px-8 py-6 flex justify-between items-center border-b border-border">
        <button
          onClick={onClose}
          className="flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
        >
          <X size={16} strokeWidth={1.5} />
          <span className="font-mono text-xs tracking-widest">CLOSE</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
        >
          <span className="font-mono text-xs tracking-widest">SHARE</span>
          <Share2 size={16} strokeWidth={1.5} />
        </button>
      </div>
      
      {/* Content - maximum whitespace */}
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Probability first - make it HUGE */}
        <div className="text-center mb-20">
          <div 
            className={cn("font-mono font-bold mb-6", probabilityColor)} 
            style={{ fontSize: '8rem', fontWeight: 700, lineHeight: 0.85, letterSpacing: '-0.03em' }}
          >
            {signal.probability}
          </div>
          <div className="font-mono text-sm text-muted-foreground tracking-widest">
            {signal.probabilityLabel}
          </div>
        </div>
        
        {/* Headline */}
        <h2 className="text-2xl mb-20 text-center max-w-2xl mx-auto leading-relaxed">
          {signal.headline}
        </h2>
        
        {/* Meta - centered */}
        <div className="flex justify-center gap-6 font-mono text-xs text-muted-foreground mb-24 tracking-wider">
          <span>{signal.source.toUpperCase()}</span>
          <span className="text-muted-foreground/30">/</span>
          <span>VOL {signal.volume}</span>
        </div>
        
        {/* Chart - minimal */}
        <div className="mb-24">
          <div className="h-80 mb-8 border-t border-b border-border py-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signal.chartData}>
                <XAxis 
                  dataKey="time" 
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '0.625rem', fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: '0.625rem', fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.75rem'
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
          
          {/* Time Range - minimal */}
          <div className="flex gap-12 justify-center">
            {(['1D', '1W', '1M', 'ALL'] as ChartTimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "font-mono text-xs tracking-widest transition-all duration-300",
                  timeRange === range 
                    ? "text-foreground scale-110" 
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        {/* Narrative */}
        <div className="mb-24 max-w-2xl mx-auto">
          <h4 className="font-mono text-muted-foreground mb-8 text-center">
            ANALYSIS
          </h4>
          <p className="text-center leading-loose">
            {signal.narrative}
          </p>
        </div>
        
        {/* Related Markets */}
        {signal.relatedMarkets && signal.relatedMarkets.length > 0 && (
          <div className="mb-24">
            <h4 className="font-mono text-muted-foreground mb-12 text-center">
              RELATED
            </h4>
            <div className="space-y-8 max-w-2xl mx-auto">
              {signal.relatedMarkets.map((market, idx) => (
                <div 
                  key={idx}
                  className="flex justify-between items-center py-6 border-t border-border hover:bg-muted/20 transition-all duration-500"
                >
                  <span className="flex-1 pr-8 text-sm">{market.question}</span>
                  <div className="text-right">
                    <div 
                      className="font-mono font-bold text-signal-up"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {market.probability}
                    </div>
                    <div className="font-mono text-[0.625rem] text-muted-foreground mt-1 tracking-widest">
                      {market.probabilityLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* External Link - minimal button */}
        <div className="text-center">
          <button className="border border-foreground px-12 py-4 hover:bg-foreground hover:text-background transition-all duration-500 flex items-center justify-center gap-3 font-mono text-xs tracking-widest mx-auto">
            <span>VIEW ON {signal.source.toUpperCase()}</span>
            <ExternalLink size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
