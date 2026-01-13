"use client";

import { RelatedMarket } from "@/types";

interface RelatedMarketsProps {
  markets: RelatedMarket[];
}

export function RelatedMarkets({ markets }: RelatedMarketsProps) {
  if (markets.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="text-accent font-mono text-xs tracking-wider mb-3 border-b border-divider pb-2">
        RELATED MARKETS:
      </h3>
      <div className="space-y-3">
        {markets.map((market) => {
          const isPositive = market.direction === "up";
          const probabilityColor = isPositive ? "text-signal-up" : "text-signal-down";
          const changeColor = market.change >= 0 ? "text-signal-up" : "text-signal-down";

          return (
            <div 
              key={market.id}
              className="flex items-start justify-between gap-4 py-2 border-b border-divider/50"
            >
              <div className="flex-1">
                <p className="text-foreground text-sm">
                  <span className="text-signal-up mr-2">&gt;</span>
                  {market.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                  <span className="text-accent">{market.market}</span>
                  <span className="text-accent/50">•</span>
                  <span className="text-accent">Vol {market.volume}</span>
                  <span className="text-accent/50">•</span>
                  <span className={changeColor}>
                    {market.change >= 0 ? "+" : ""}{market.change}%
                  </span>
                  <span className="text-accent/50">change</span>
                </div>
              </div>
              <span className={`font-mono text-sm font-semibold ${probabilityColor} whitespace-nowrap`}>
                [ {market.probability}% {market.outcome} ]
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
