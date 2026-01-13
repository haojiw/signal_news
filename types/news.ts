export type TimeSlot = '08:00' | '14:00' | '20:00';

export type MarketSource = 'Polymarket' | 'Kalshi' | 'Manifold';

export type SignalDirection = 'up' | 'down' | 'neutral';

export interface NewsSignal {
  id: string;
  headline: string;
  source: MarketSource;
  volume: string;
  changePercent: number;
  probability: number;
  probabilityLabel: string;
  timeSlot: TimeSlot;
  rank: number;
  narrative: string;
  relatedMarkets?: RelatedMarket[];
  chartData: ChartDataPoint[];
}

export interface RelatedMarket {
  question: string;
  probability: number;
  probabilityLabel: string;
}

export interface ChartDataPoint {
  time: string;
  probability: number;
}
