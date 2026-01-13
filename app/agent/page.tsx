"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AgentWorker, sampleAgentTasks } from '@/components/AgentWorker';
import { AGENT_CONFIG } from '@/lib/config';

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #2d4a2d 0%, #1a2e1a 50%, #0f1f0f 100%)',
        }}
      >
        {/* Navigation */}
        <nav className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#7a7a70] hover:text-[#e5e5e0] transition-colors duration-300 font-mono text-xs tracking-widest"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span>BACK TO FEED</span>
          </Link>
        </nav>

        {/* Agent Worker Display */}
        <div className="flex-1 flex items-center justify-center p-8">
          <AgentWorker
            agentId={AGENT_CONFIG.defaultAgentId}
            taskName={AGENT_CONFIG.defaultTaskName}
            confidenceScore={AGENT_CONFIG.defaultConfidenceScore}
            tasks={sampleAgentTasks}
            statusMessage={AGENT_CONFIG.defaultStatusMessage}
            queueCount={AGENT_CONFIG.defaultQueueCount}
          />
        </div>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="font-mono text-[0.6875rem] text-[#5a5a55] tracking-widest">
            AI-POWERED SIGNAL ANALYSIS
          </p>
        </footer>
      </div>
    </div>
  );
}
