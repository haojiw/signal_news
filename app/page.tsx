"use client";

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { TimeSlotNav } from '@/components/TimeSlotNav';
import { NewsFeed } from '@/components/NewsFeed';
import { SignalDetail } from '@/components/SignalDetail';
import { AgentWorker, sampleAgentTasks } from '@/components/AgentWorker';
import { NewsSignal, TimeSlot } from '@/types/news';
import { mockNewsData, getCurrentTimeSlot } from '@/lib/mockData';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>(getCurrentTimeSlot());
  const [selectedSignal, setSelectedSignal] = useState<NewsSignal | null>(null);
  const [showAgentDemo, setShowAgentDemo] = useState(true);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const currentSignals = mockNewsData[currentTimeSlot] || [];
  
  // Get current date - Yeezy style formatting
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
  
  // If showing agent demo, render it full screen
  if (showAgentDemo) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div 
          className="min-h-screen flex items-center justify-center p-10"
          style={{
            background: 'linear-gradient(135deg, #2d4a2d 0%, #1a2e1a 50%, #0f1f0f 100%)',
          }}
        >
          <AgentWorker
            agentId="AGENT_WORKER_04"
            taskName="TAIWAN_RISK"
            confidenceScore={25}
            tasks={sampleAgentTasks}
            statusMessage="Validating assumptions..."
            queueCount={12}
          />
        </div>
        <button
          onClick={() => setShowAgentDemo(false)}
          className="fixed bottom-8 right-8 px-4 py-2 bg-foreground text-background font-mono text-xs tracking-wider hover:opacity-80 transition-opacity"
        >
          VIEW NEWS FEED
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal header - Yeezy style */}
      <header className="border-b border-border px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mb-2">SIGNAL</h1>
              <div className="font-mono text-[0.625rem] text-muted-foreground tracking-widest">
                {dateStr}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAgentDemo(true)}
                className="px-3 py-2 hover:bg-muted transition-all duration-300 font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground"
              >
                AGENT
              </button>
              <button
                onClick={toggleTheme}
                className="p-3 hover:bg-muted transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Time Slot Navigation */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto">
          <TimeSlotNav 
            currentSlot={currentTimeSlot} 
            onSlotChange={setCurrentTimeSlot} 
          />
        </div>
      </div>
      
      {/* News Feed - maximum whitespace */}
      <main className="max-w-6xl mx-auto py-20">
        {currentSignals.length > 0 ? (
          <NewsFeed 
            signals={currentSignals}
            timeSlot={currentTimeSlot}
            onSignalClick={setSelectedSignal}
          />
        ) : (
          <div className="py-32 text-center">
            <p className="font-mono text-xs text-muted-foreground tracking-widest">
              NO DATA
            </p>
          </div>
        )}
      </main>
      
      {/* Minimal footer */}
      <footer className="border-t border-border mt-32 py-12 text-center">
        <p className="font-mono text-[0.625rem] text-muted-foreground tracking-widest">
          PREDICTION MARKETS AS REALITY
        </p>
      </footer>
      
      {/* Signal Detail Modal */}
      {selectedSignal && (
        <SignalDetail 
          signal={selectedSignal} 
          onClose={() => setSelectedSignal(null)} 
        />
      )}
    </div>
  );
}
