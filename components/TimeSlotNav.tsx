"use client";

import { TimeSlot } from '@/types/news';
import { getTimeSlotStatus } from '@/lib/mockData';
import { TIME_SLOTS } from '@/lib/config';
import { cn } from '@/lib/utils';

interface TimeSlotNavProps {
  currentSlot: TimeSlot;
  onSlotChange: (slot: TimeSlot) => void;
}

export function TimeSlotNav({ currentSlot, onSlotChange }: TimeSlotNavProps) {
  return (
    <div className="flex gap-10 justify-center py-8">
      {TIME_SLOTS.map((slot) => {
        const status = getTimeSlotStatus(slot);
        const isActive = slot === currentSlot;

        return (
          <button
            key={slot}
            onClick={() => onSlotChange(slot)}
            disabled={status === 'future'}
            className={cn(
              "font-mono text-[0.8125rem] transition-all duration-300",
              isActive
                ? "text-foreground font-medium"
                : status === 'future'
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
