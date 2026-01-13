import { Signal, SignalDetail, ChartDataPoint, TimeSlotData } from "@/types";

// Generate realistic chart data with a spike pattern
function generateChartData(baseValue: number, trend: "up" | "down"): ChartDataPoint[] {
  const points: ChartDataPoint[] = [];
  let value = trend === "up" ? baseValue * 0.3 : baseValue * 1.2;
  
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      
      // Add some volatility
      const volatility = (Math.random() - 0.5) * 5;
      
      // Trend towards target
      if (trend === "up") {
        value = Math.min(baseValue, value + Math.random() * 3 + volatility);
      } else {
        value = Math.max(baseValue, value - Math.random() * 3 + volatility);
      }
      
      points.push({ time: timeStr, value: Math.max(0, Math.min(100, value)) });
    }
  }
  
  return points;
}

export const signals: Signal[] = [
  {
    id: "btc-etf",
    headline: "Bitcoin spot ETF approval likely by Wednesday.",
    market: "Polymarket",
    volume: "$4.2M",
    change24h: 15,
    probability: 92,
    outcome: "YES",
    direction: "up",
    category: "Crypto",
  },
  {
    id: "taiwan-election",
    headline: "Taiwan Election: DPP candidate maintains lead in final polling days.",
    market: "Kalshi",
    volume: "$850k",
    change24h: -2,
    probability: 64,
    outcome: "WIN",
    direction: "up",
    category: "Politics",
  },
  {
    id: "swift-kelce",
    headline: "Taylor Swift / Kelce engagement rumors cool off.",
    market: "Polymarket",
    volume: "$120k",
    change24h: -30,
    probability: 12,
    outcome: "YES",
    direction: "down",
    category: "Entertainment",
  },
  {
    id: "eu-russia-oil",
    headline: "EU to ban Russian oil imports by March.",
    market: "PredictIt",
    volume: "$1.1M",
    change24h: 5,
    probability: 78,
    outcome: "YES",
    direction: "up",
    category: "Geopolitics",
  },
  {
    id: "apple-q4",
    headline: "Apple's Q4 earnings expected to miss target.",
    market: "Kalshi",
    volume: "$950k",
    change24h: -8,
    probability: 35,
    outcome: "NO",
    direction: "down",
    category: "Markets",
  },
  {
    id: "iran-nuclear",
    headline: "Iran nuclear deal talks break down.",
    market: "Polymarket",
    volume: "$600k",
    change24h: 20,
    probability: 82,
    outcome: "YES",
    direction: "up",
    category: "Geopolitics",
  },
  {
    id: "us-gdp",
    headline: "U.S. GDP growth above 3% for Q4?",
    market: "PredictIt",
    volume: "$2.8M",
    change24h: 12,
    probability: 58,
    outcome: "YES",
    direction: "up",
    category: "Economy",
  },
  {
    id: "fed-rate",
    headline: "Fed to pause rate hikes in February meeting.",
    market: "Kalshi",
    volume: "$3.5M",
    change24h: 8,
    probability: 71,
    outcome: "YES",
    direction: "up",
    category: "Economy",
  },
  {
    id: "spacex-starship",
    headline: "SpaceX Starship orbital test before month end.",
    market: "Polymarket",
    volume: "$420k",
    change24h: -5,
    probability: 44,
    outcome: "YES",
    direction: "down",
    category: "Tech",
  },
  {
    id: "uk-election",
    headline: "UK snap election to be called by March.",
    market: "PredictIt",
    volume: "$1.8M",
    change24h: 25,
    probability: 67,
    outcome: "YES",
    direction: "up",
    category: "Politics",
  },
];

export const signalDetails: Record<string, SignalDetail> = {
  "btc-etf": {
    ...signals[0],
    narrative:
      "SEC insiders suggest final S-1 form approval is imminent, triggering a massive buy-side surge on prediction markets over the last 12 hours. Traditional financial news outlets are now echoing this probability spike. BlackRock and Fidelity amendments have been filed, with sources indicating all technical objections have been resolved.",
    chartData: generateChartData(92, "up"),
    relatedMarkets: [
      {
        id: "eth-etf",
        title: "ETH ETF approved by May?",
        probability: 45,
        outcome: "YES",
        direction: "up",
        market: "Polymarket",
        volume: "$4.1M",
        change: 5,
      },
      {
        id: "btc-50k",
        title: "Bitcoin hits $50k this week?",
        probability: 30,
        outcome: "YES",
        direction: "down",
        market: "Polymarket",
        volume: "$950k",
        change: -20,
      },
    ],
    externalUrl: "https://polymarket.com",
  },
  "taiwan-election": {
    ...signals[1],
    narrative:
      "Latest polling shows DPP's Lai Ching-te maintaining a 5-point lead over KMT rival. Cross-strait tensions remain elevated as Beijing signals displeasure with potential DPP continuity. Market liquidity has increased significantly as election day approaches.",
    chartData: generateChartData(64, "up"),
    relatedMarkets: [
      {
        id: "china-taiwan",
        title: "China military action in Taiwan Strait 2024?",
        probability: 8,
        outcome: "NO",
        direction: "down",
        market: "Kalshi",
        volume: "$2.1M",
        change: -3,
      },
    ],
    externalUrl: "https://kalshi.com",
  },
  "swift-kelce": {
    ...signals[2],
    narrative:
      "Initial surge in engagement speculation has cooled as both camps remain silent. Social media sentiment analysis shows declining interest, with prediction market volume also dropping. Sources close to the couple suggest no imminent announcement is planned.",
    chartData: generateChartData(12, "down"),
    relatedMarkets: [
      {
        id: "swift-tour",
        title: "Taylor Swift extends Eras Tour to 2025?",
        probability: 78,
        outcome: "YES",
        direction: "up",
        market: "Polymarket",
        volume: "$85k",
        change: 10,
      },
    ],
    externalUrl: "https://polymarket.com",
  },
  "eu-russia-oil": {
    ...signals[3],
    narrative:
      "European Commission sources indicate strong consensus building for accelerated timeline. Hungary's continued opposition appears isolated, with potential side-deal in negotiations. Energy security concerns driving urgency despite price impact fears.",
    chartData: generateChartData(78, "up"),
    relatedMarkets: [
      {
        id: "oil-100",
        title: "Brent crude above $100 by Q2?",
        probability: 42,
        outcome: "YES",
        direction: "up",
        market: "PredictIt",
        volume: "$1.5M",
        change: 8,
      },
    ],
    externalUrl: "https://predictit.org",
  },
  "apple-q4": {
    ...signals[4],
    narrative:
      "Supply chain data suggests iPhone 15 production fell short of targets. China market weakness and currency headwinds compound the challenge. Analysts have been quietly revising estimates downward over the past week.",
    chartData: generateChartData(35, "down"),
    relatedMarkets: [
      {
        id: "aapl-180",
        title: "AAPL below $180 by earnings?",
        probability: 25,
        outcome: "YES",
        direction: "down",
        market: "Kalshi",
        volume: "$420k",
        change: -5,
      },
    ],
    externalUrl: "https://kalshi.com",
  },
  "iran-nuclear": {
    ...signals[5],
    narrative:
      "Diplomatic sources report fundamental disagreements on enrichment timelines remain unresolved. Recent IAEA report documenting undisclosed activities has hardened Western positions. Tehran signals unwillingness to return to original JCPOA terms.",
    chartData: generateChartData(82, "up"),
    relatedMarkets: [
      {
        id: "iran-sanctions",
        title: "New Iran sanctions by February?",
        probability: 65,
        outcome: "YES",
        direction: "up",
        market: "Polymarket",
        volume: "$320k",
        change: 12,
      },
    ],
    externalUrl: "https://polymarket.com",
  },
  "us-gdp": {
    ...signals[6],
    narrative:
      "Atlanta Fed GDPNow tracker showing resilient consumer spending. Holiday retail data exceeded expectations, while business investment remains stable. Labor market strength continues to support economic momentum.",
    chartData: generateChartData(58, "up"),
    relatedMarkets: [
      {
        id: "recession",
        title: "US recession declared in 2024?",
        probability: 18,
        outcome: "NO",
        direction: "down",
        market: "PredictIt",
        volume: "$3.2M",
        change: -8,
      },
    ],
    externalUrl: "https://predictit.org",
  },
  "fed-rate": {
    ...signals[7],
    narrative:
      "Fed funds futures pricing in high probability of pause. Recent inflation data showing continued cooling trend. FOMC members' public comments suggest data-dependent approach favoring hold.",
    chartData: generateChartData(71, "up"),
    relatedMarkets: [
      {
        id: "rate-cuts",
        title: "Fed cuts rates before July?",
        probability: 55,
        outcome: "YES",
        direction: "up",
        market: "Kalshi",
        volume: "$2.8M",
        change: 15,
      },
    ],
    externalUrl: "https://kalshi.com",
  },
  "spacex-starship": {
    ...signals[8],
    narrative:
      "FAA license approval remains pending with no clear timeline. Recent static fire tests showed mixed results. SpaceX sources indicate aggressive timeline may slip into next month.",
    chartData: generateChartData(44, "down"),
    relatedMarkets: [
      {
        id: "mars-2024",
        title: "SpaceX announces Mars mission date 2024?",
        probability: 22,
        outcome: "YES",
        direction: "down",
        market: "Polymarket",
        volume: "$180k",
        change: -10,
      },
    ],
    externalUrl: "https://polymarket.com",
  },
  "uk-election": {
    ...signals[9],
    narrative:
      "Conservative polling collapse accelerates, with internal party pressure mounting on leadership. Sunak cabinet reportedly divided on election timing. Labour maintains commanding lead in all major polls.",
    chartData: generateChartData(67, "up"),
    relatedMarkets: [
      {
        id: "labour-win",
        title: "Labour wins next UK election?",
        probability: 85,
        outcome: "YES",
        direction: "up",
        market: "PredictIt",
        volume: "$2.2M",
        change: 3,
      },
    ],
    externalUrl: "https://predictit.org",
  },
};

export const timeSlots: TimeSlotData[] = [
  {
    slot: "08:00",
    isActive: true,
    isLocked: false,
    signals: signals,
  },
  {
    slot: "14:00",
    isActive: false,
    isLocked: false,
    signals: [],
  },
  {
    slot: "20:00",
    isActive: false,
    isLocked: true,
    signals: [],
  },
];

export function getSignalById(id: string): SignalDetail | undefined {
  return signalDetails[id];
}
