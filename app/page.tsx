"use client";

import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { TimeSlotNav } from '@/components/TimeSlotNav';
import { NewsFeed } from '@/components/NewsFeed';
import { SignalDetail } from '@/components/SignalDetail';
import { useSignals } from '@/hooks/useSignals';
import { cn } from '@/lib/utils';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const {
    signals,
    currentTimeSlot,
    setTimeSlot,
    selectedSignal,
    selectSignal,
  } = useSignals();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Get current date - Yeezy style formatting
  const today = new Date();
  const dateStr = today
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header */}
      <header className="border-b border-border px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mb-1">SIGNAL</h1>
              <div className="font-mono text-[0.6875rem] text-muted-foreground tracking-widest">
                {dateStr}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/agent"
                className={cn(
                  "px-3 py-1.5 hover:bg-muted transition-all duration-300",
                  "font-mono text-[0.75rem] tracking-widest",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                AGENT
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-muted transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={16} strokeWidth={1.5} />
                ) : (
                  <Moon size={16} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Time Slot Navigation */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto">
          <TimeSlotNav currentSlot={currentTimeSlot} onSlotChange={setTimeSlot} />
        </div>
      </div>

      {/* News Feed */}
      <main className="max-w-6xl mx-auto py-12">
        {signals.length > 0 ? (
          <NewsFeed
            signals={signals}
            timeSlot={currentTimeSlot}
            onSignalClick={selectSignal}
          />
        ) : (
          <div className="py-24 text-center">
            <p className="font-mono text-[0.75rem] text-muted-foreground tracking-widest">
              NO DATA
            </p>
          </div>
        )}
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border mt-20 py-8 text-center">
        <p className="font-mono text-[0.6875rem] text-muted-foreground tracking-widest">
          PREDICTION MARKETS AS REALITY
        </p>
      </footer>

      {/* Signal Detail Modal */}
      {selectedSignal && (
        <SignalDetail signal={selectedSignal} onClose={() => selectSignal(null)} />
      )}
    </div>
  );
}
