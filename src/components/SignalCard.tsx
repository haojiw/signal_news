"use client";

import { Signal } from "@/types";
import Link from "next/link";

interface SignalCardProps {
  signal: Signal;
  index: number;
}

export function SignalCard({ signal, index }: SignalCardProps) {
  const isPositive = signal.direction === "up";
  const changeColor = signal.change24h >= 0 ? "text-signal-up" : "text-signal-down";
  const probabilityColor = isPositive ? "text-signal-up" : "text-signal-down";

  return (
    <Link href={`/signal/${signal.id}`}>
      <article 
        className="border-b border-divider py-4 hover:bg-hover-bg transition-colors duration-150 px-2 -mx-2 cursor-pointer group"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-foreground font-medium leading-snug group-hover:text-signal-up transition-colors">
              {signal.headline}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm font-mono">
              <span className="text-accent">{signal.market}</span>
              <span className="text-accent/50">•</span>
              <span className="text-accent">Vol {signal.volume}</span>
              <span className="text-accent/50">•</span>
              <span className={changeColor}>
                {signal.change24h >= 0 ? "+" : ""}{signal.change24h}%
              </span>
              <span className="text-accent/50">24h change</span>
            </div>
          </div>
          <div className={`font-mono text-lg font-semibold ${probabilityColor} whitespace-nowrap`}>
            [ {signal.probability}% {signal.outcome} ]
          </div>
        </div>
      </article>
    </Link>
  );
}
