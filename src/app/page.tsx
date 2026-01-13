"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { TimeSlotNav } from "@/components/TimeSlotNav";
import { SignalList } from "@/components/SignalList";
import { signals } from "@/data/mockData";
import { TimeSlot } from "@/types";

export default function Home() {
  const [activeSlot, setActiveSlot] = useState<TimeSlot>("08:00");

  // In a real app, we'd fetch different signals for each slot
  const currentSignals = activeSlot === "08:00" ? signals : [];

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile device frame simulation */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Header />
        <TimeSlotNav activeSlot={activeSlot} onSlotChange={setActiveSlot} />
        <SignalList signals={currentSignals} activeSlot={activeSlot} />
      </div>
    </main>
  );
}
