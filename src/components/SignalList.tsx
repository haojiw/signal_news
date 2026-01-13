"use client";

import { Signal, TimeSlot } from "@/types";
import { SignalCard } from "./SignalCard";

interface SignalListProps {
  signals: Signal[];
  activeSlot: TimeSlot;
}

export function SignalList({ signals, activeSlot }: SignalListProps) {
  return (
    <section className="page-transition">
      <div className="border-b border-divider pb-2 mb-4">
        <h3 className="text-accent font-mono text-xs tracking-wider">
          TOP 10 SIGNALS // {activeSlot} DROP
        </h3>
      </div>
      
      <div className="divide-y divide-divider">
        {signals.map((signal, index) => (
          <SignalCard key={signal.id} signal={signal} index={index} />
        ))}
      </div>

      {signals.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-accent font-mono">
            [ NO SIGNALS AVAILABLE ]
          </p>
          <p className="text-accent/50 text-sm mt-2">
            Check back at the next drop time
          </p>
        </div>
      )}
    </section>
  );
}
