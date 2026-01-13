import { TimeSlot } from '@/types/news';

// Time slot configuration
export const TIME_SLOTS: TimeSlot[] = ['08:00', '14:00', '20:00'];

// Chart time range options
export const CHART_TIME_RANGES = ['1D', '1W', '1M', 'ALL'] as const;
export type ChartTimeRange = typeof CHART_TIME_RANGES[number];

// UI Configuration
export const UI_CONFIG = {
  maxContainerWidth: '6xl',
  feedContainerWidth: '4xl',
  animationDuration: {
    fast: 300,
    normal: 500,
  },
} as const;

// Market sources
export const MARKET_SOURCES = ['Polymarket', 'Kalshi', 'Manifold'] as const;

// Agent worker default config
export const AGENT_CONFIG = {
  defaultAgentId: 'AGENT_WORKER_04',
  defaultTaskName: 'TAIWAN_RISK',
  defaultConfidenceScore: 25,
  defaultQueueCount: 12,
  defaultStatusMessage: 'Validating assumptions...',
} as const;
