"use client";

import { NewsSignal } from '@/types/news';
import { X, ExternalLink, Share2 } from 'lucide-react';
import { ProbabilityDisplay, getDirection } from './ProbabilityDisplay';
import { MarketChart } from './MarketChart';
import { cn } from '@/lib/utils';

interface SignalDetailProps {
  signal: NewsSignal;
  onClose: () => void;
}

export function SignalDetail({ signal, onClose }: SignalDetailProps) {
  const direction = getDirection(signal.changePercent);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: signal.headline,
        text: `${signal.probability}% ${signal.probabilityLabel} - ${signal.headline}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/98 backdrop-blur-sm px-6 py-4 flex justify-between items-center border-b border-border">
        <button
          onClick={onClose}
          className="flex items-center gap-2 hover:opacity-60 transition-opacity duration-300"
        >
          <X size={14} strokeWidth={1.5} />
          <span className="font-mono text-xs tracking-widest">CLOSE</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 hover:opacity-60 transition-opacity duration-300"
        >
          <span className="font-mono text-xs tracking-widest">SHARE</span>
          <Share2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Probability - Hero */}
        <div className="text-center mb-10">
          <ProbabilityDisplay
            probability={signal.probability}
            label={signal.probabilityLabel}
            changePercent={signal.changePercent}
            size="xl"
            className="text-center"
          />
        </div>

        {/* Headline */}
        <h2 className="text-xl mb-10 text-center max-w-2xl mx-auto leading-tight">
          {signal.headline}
        </h2>

        {/* Meta */}
        <div className="flex justify-center gap-4 font-mono text-[0.6875rem] text-muted-foreground mb-12 tracking-wider">
          <span>{signal.source.toUpperCase()}</span>
          <span className="text-muted-foreground/30">/</span>
          <span>VOL {signal.volume}</span>
        </div>

        {/* Chart */}
        <div className="mb-12">
          <MarketChart
            data={signal.chartData}
            direction={direction}
            height={200}
            showTimeRangeSelector={true}
          />
        </div>

        {/* Narrative */}
        <div className="mb-12 max-w-2xl mx-auto">
          <h4 className="font-mono text-muted-foreground mb-4 text-center">
            ANALYSIS
          </h4>
          <p className="text-center leading-relaxed">{signal.narrative}</p>
        </div>

        {/* Related Markets */}
        {signal.relatedMarkets && signal.relatedMarkets.length > 0 && (
          <div className="mb-12">
            <h4 className="font-mono text-muted-foreground mb-6 text-center">
              RELATED
            </h4>
            <div className="space-y-4 max-w-2xl mx-auto">
              {signal.relatedMarkets.map((market, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex justify-between items-center py-4",
                    "border-t border-border hover:bg-muted/20 transition-all duration-300"
                  )}
                >
                  <span className="flex-1 pr-6 text-[0.9375rem]">{market.question}</span>
                  <ProbabilityDisplay
                    probability={market.probability}
                    label={market.probabilityLabel}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Link */}
        <div className="text-center">
          <button
            className={cn(
              "border border-foreground px-8 py-3",
              "hover:bg-foreground hover:text-background",
              "transition-all duration-300",
              "flex items-center justify-center gap-2",
              "font-mono text-[0.75rem] tracking-widest mx-auto"
            )}
          >
            <span>VIEW ON {signal.source.toUpperCase()}</span>
            <ExternalLink size={12} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
