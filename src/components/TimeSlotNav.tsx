"use client";

import { TimeSlot } from "@/types";

interface TimeSlotNavProps {
  activeSlot: TimeSlot;
  onSlotChange: (slot: TimeSlot) => void;
}

const slots: { slot: TimeSlot; locked: boolean }[] = [
  { slot: "08:00", locked: false },
  { slot: "14:00", locked: false },
  { slot: "20:00", locked: true },
];

export function TimeSlotNav({ activeSlot, onSlotChange }: TimeSlotNavProps) {
  return (
    <nav className="flex items-center justify-center gap-4 mb-6 border-b border-divider pb-4">
      {slots.map(({ slot, locked }) => {
        const isActive = activeSlot === slot;
        const isPast = slots.findIndex((s) => s.slot === activeSlot) > slots.findIndex((s) => s.slot === slot);
        
        return (
          <button
            key={slot}
            onClick={() => !locked && onSlotChange(slot)}
            disabled={locked}
            className={`
              font-mono text-base px-4 py-2 transition-all duration-200
              ${isActive 
                ? "text-foreground border-b-2 border-signal-up" 
                : isPast 
                  ? "text-accent/50" 
                  : locked 
                    ? "text-accent/30 cursor-not-allowed" 
                    : "text-accent hover:text-foreground"
              }
            `}
          >
            [ {slot} ]{locked && " 🔒"}
          </button>
        );
      })}
    </nav>
  );
}
