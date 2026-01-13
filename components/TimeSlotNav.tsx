"use client";

import { TimeSlot } from '@/types/news';
import { getTimeSlotStatus } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface TimeSlotNavProps {
  currentSlot: TimeSlot;
  onSlotChange: (slot: TimeSlot) => void;
}

const timeSlots: TimeSlot[] = ['08:00', '14:00', '20:00'];

export function TimeSlotNav({ currentSlot, onSlotChange }: TimeSlotNavProps) {
  return (
    <div className="flex gap-12 justify-center py-12">
      {timeSlots.map((slot) => {
        const status = getTimeSlotStatus(slot);
        const isActive = slot === currentSlot;
        
        return (
          <button
            key={slot}
            onClick={() => onSlotChange(slot)}
            disabled={status === 'future'}
            className={cn(
              "font-mono text-sm transition-all duration-300",
              isActive 
                ? "text-foreground scale-110" 
                : status === 'future'
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:scale-105"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
