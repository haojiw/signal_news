"use client";

import { NewsSignal } from '@/types/news';
import { ProbabilityDisplay, getDirection } from './ProbabilityDisplay';
import { cn } from '@/lib/utils';

interface NewsItemProps {
  signal: NewsSignal;
  onClick: () => void;
}

export function NewsItem({ signal, onClick }: NewsItemProps) {
  const direction = getDirection(signal.changePercent);
  const changePrefix = signal.changePercent > 0 ? '+' : '';

  const directionColorClass =
    direction === 'up'
      ? 'text-signal-up'
      : direction === 'down'
      ? 'text-signal-down'
      : 'text-signal-neutral';

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-8 transition-all duration-300 text-left group",
        "border-t border-border first:border-t-0 hover:bg-muted/20"
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Rank indicator */}
        <div className="font-mono text-[0.6875rem] text-muted-foreground mb-3 tracking-widest">
          NO. {String(signal.rank).padStart(2, '0')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Content */}
          <div>
            <h3 className="mb-4 text-[1rem] leading-snug group-hover:text-muted-foreground transition-colors duration-300">
              {signal.headline}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] font-mono text-muted-foreground tracking-wider">
              <span>{signal.source.toUpperCase()}</span>
              <span className="text-muted-foreground/30">/</span>
              <span>{signal.volume}</span>
              <span className="text-muted-foreground/30">/</span>
              <span className={directionColorClass}>
                {changePrefix}
                {signal.changePercent}%
              </span>
            </div>
          </div>

          {/* Probability Display */}
          <ProbabilityDisplay
            probability={signal.probability}
            label={signal.probabilityLabel}
            changePercent={signal.changePercent}
            size="lg"
            className="md:min-w-[140px]"
          />
        </div>
      </div>
    </button>
  );
}
