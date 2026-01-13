"use client";

import { NewsSignal } from '@/types/news';
import { cn } from '@/lib/utils';

interface NewsItemProps {
  signal: NewsSignal;
  onClick: () => void;
}

export function NewsItem({ signal, onClick }: NewsItemProps) {
  const changeDirection = signal.changePercent > 0 ? 'up' : signal.changePercent < 0 ? 'down' : 'neutral';
  
  const probabilityColor = changeDirection === 'up' 
    ? 'text-signal-up' 
    : changeDirection === 'down' 
    ? 'text-signal-down' 
    : 'text-signal-neutral';
  
  const changePrefix = signal.changePercent > 0 ? '+' : '';
  
  return (
    <button
      onClick={onClick}
      className="w-full py-16 transition-all duration-500 text-left group border-t border-border first:border-t-0 hover:bg-muted/20"
    >
      <div className="max-w-4xl mx-auto px-8">
        {/* Minimal rank indicator */}
        <div className="font-mono text-[0.625rem] text-muted-foreground mb-6 tracking-widest">
          NO. {String(signal.rank).padStart(2, '0')}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Content */}
          <div>
            <h3 className="mb-8 text-lg leading-relaxed group-hover:text-muted-foreground transition-colors duration-500">
              {signal.headline}
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-muted-foreground tracking-wider">
              <span>{signal.source.toUpperCase()}</span>
              <span className="text-muted-foreground/30">/</span>
              <span>{signal.volume}</span>
              <span className="text-muted-foreground/30">/</span>
              <span className={probabilityColor}>
                {changePrefix}{signal.changePercent}%
              </span>
            </div>
          </div>
          
          {/* Probability - Huge and centered */}
          <div className="text-right md:min-w-[180px]">
            <div 
              className={cn("font-mono font-bold", probabilityColor)}
              style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.02em' }}
            >
              {signal.probability}
            </div>
            <div className="font-mono text-[0.625rem] text-muted-foreground mt-4 tracking-widest">
              {signal.probabilityLabel}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
