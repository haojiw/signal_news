export type SignalDirection = "up" | "down";
export type SignalOutcome = "YES" | "NO" | "WIN" | "LOSE";
export type TimeSlot = "08:00" | "14:00" | "20:00";
export type ChartTimeframe = "1D" | "1W" | "1M" | "ALL";

export interface Signal {
  id: string;
  headline: string;
  market: "Polymarket" | "Kalshi" | "PredictIt";
  volume: string;
  change24h: number;
  probability: number;
  outcome: SignalOutcome;
  direction: SignalDirection;
  category?: string;
}

export interface SignalDetail extends Signal {
  narrative: string;
  chartData: ChartDataPoint[];
  relatedMarkets: RelatedMarket[];
  externalUrl: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface RelatedMarket {
  id: string;
  title: string;
  probability: number;
  outcome: SignalOutcome;
  direction: SignalDirection;
  market: string;
  volume: string;
  change: number;
}

export interface TimeSlotData {
  slot: TimeSlot;
  isActive: boolean;
  isLocked: boolean;
  signals: Signal[];
}
