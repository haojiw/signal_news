"use client";

import { Check, Loader2 } from 'lucide-react';

interface Task {
  id: string;
  label: string;
  source?: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface AgentWorkerProps {
  agentId: string;
  taskName: string;
  confidenceScore: number;
  tasks: Task[];
  statusMessage: string;
  queueCount: number;
}

export function AgentWorker({
  agentId,
  taskName,
  confidenceScore,
  tasks,
  statusMessage,
  queueCount,
}: AgentWorkerProps) {
  return (
    <div className="agent-worker-card">
      {/* Header */}
      <div className="agent-header">
        <div className="agent-id">
          <span className="status-dot" />
          <span className="agent-name">{agentId}</span>
        </div>
        <div className="task-label">
          <span className="task-prefix">TASK:</span>
          <span className="task-name">{taskName}</span>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="confidence-section">
        <span className="confidence-label">CONFIDENCE SCORE</span>
        <div className="confidence-bar-container">
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
          <span className="confidence-value">{confidenceScore}%</span>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-content">
              <span className="task-text">{task.label}</span>
              {task.source && (
                <div className="task-source">
                  <span className="source-divider">|</span>
                  <span className="source-label">Source:</span>
                  <span className="source-value">{task.source}</span>
                </div>
              )}
            </div>
            <div className="task-status">
              {task.status === 'completed' && (
                <Check className="status-check" size={18} strokeWidth={2.5} />
              )}
              {task.status === 'in_progress' && (
                <Loader2 className="status-spinner" size={18} strokeWidth={2} />
              )}
              {task.status === 'pending' && (
                <span className="status-pending" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="agent-footer">
        <span className="footer-status">{statusMessage}</span>
        <span className="footer-queue">Queue: {queueCount}</span>
      </div>

      <style jsx>{`
        .agent-worker-card {
          background: linear-gradient(145deg, #1e2a1e 0%, #162016 50%, #0f170f 100%);
          border-radius: 16px;
          padding: 24px 28px;
          width: 100%;
          max-width: 520px;
          font-family: 'Space Mono', 'Courier New', monospace;
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(74, 107, 74, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.02);
        }

        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .agent-id {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          background: #4ade80;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
        }

        .agent-name {
          color: #e5e5e0;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .task-label {
          display: flex;
          gap: 8px;
          color: #7a7a70;
          font-size: 13px;
          letter-spacing: 0.03em;
        }

        .task-prefix {
          color: #5a5a55;
        }

        .task-name {
          color: #9a9a90;
        }

        .confidence-section {
          margin-bottom: 32px;
        }

        .confidence-label {
          display: block;
          color: #5a5a55;
          font-size: 11px;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }

        .confidence-bar-container {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .confidence-bar {
          flex: 1;
          height: 6px;
          background: #2a352a;
          border-radius: 3px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
          border-radius: 3px;
          transition: width 0.5s ease-out;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
        }

        .confidence-value {
          color: #4ade80;
          font-size: 14px;
          font-weight: 400;
          min-width: 42px;
          text-align: right;
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .task-content {
          flex: 1;
        }

        .task-text {
          color: #e5e5e0;
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: 0.01em;
        }

        .task-source {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          padding-left: 12px;
        }

        .source-divider {
          color: #3a4a3a;
          font-size: 14px;
        }

        .source-label {
          color: #5a5a55;
          font-size: 12px;
        }

        .source-value {
          color: #7a7a70;
          font-size: 12px;
        }

        .task-status {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        :global(.status-check) {
          color: #4ade80;
        }

        :global(.status-spinner) {
          color: #4ade80;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .status-pending {
          width: 8px;
          height: 8px;
          background: #4a4a45;
          border-radius: 50%;
        }

        .agent-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #2a352a;
        }

        .footer-status {
          color: #5a5a55;
          font-size: 13px;
          letter-spacing: 0.02em;
        }

        .footer-queue {
          color: #7a7a70;
          font-size: 13px;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}

// Sample tasks for demo
export const sampleAgentTasks: Task[] = [
  {
    id: '1',
    label: 'Verify naval exercise zone coordinates',
    source: 'Sat_Img_Sentinel_2',
    status: 'completed',
  },
  {
    id: '2',
    label: 'Cross-reference shipping lane deviations',
    status: 'in_progress',
  },
  {
    id: '3',
    label: 'Analyze sentiment in local Weibo feeds',
    status: 'pending',
  },
  {
    id: '4',
    label: 'Check semiconductor inventory stockpiles',
    status: 'pending',
  },
];
