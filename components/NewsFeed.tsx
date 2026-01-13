"use client";

import { NewsSignal, TimeSlot } from '@/types/news';
import { NewsItem } from './NewsItem';

interface NewsFeedProps {
  signals: NewsSignal[];
  timeSlot: TimeSlot;
  onSignalClick: (signal: NewsSignal) => void;
}

export function NewsFeed({ signals, timeSlot, onSignalClick }: NewsFeedProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-10 text-center">
        <h4 className="font-mono text-muted-foreground">{timeSlot} DROP</h4>
      </div>

      {/* News Items */}
      <div>
        {signals.map((signal) => (
          <NewsItem
            key={signal.id}
            signal={signal}
            onClick={() => onSignalClick(signal)}
          />
        ))}
      </div>
    </div>
  );
}
