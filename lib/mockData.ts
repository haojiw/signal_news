import { NewsSignal, TimeSlot } from '@/types/news';

// Generate chart data for the past 24 hours
const generateChartData = (endProbability: number, volatility: number = 10) => {
  const points = 24;
  const data = [];
  let currentProb = endProbability - volatility + Math.random() * volatility * 2;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility;
    currentProb = Math.max(0, Math.min(100, currentProb + change));
    data.push({
      time: `${23 - i}h`,
      probability: currentProb
    });
  }
  
  data.reverse();
  data[data.length - 1].probability = endProbability;
  
  return data;
};

export const mockNewsData: Record<TimeSlot, NewsSignal[]> = {
  '08:00': [
    {
      id: '1',
      headline: 'Bitcoin spot ETF approval likely by Wednesday.',
      source: 'Polymarket',
      volume: '$4.2M',
      changePercent: 15,
      probability: 92,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 1,
      narrative: 'SEC insiders suggest final S-1 form approval is imminent, triggering a massive buy-side surge on prediction markets over the last 12 hours. Traditional financial news outlets are now echoing this probability spike.',
      relatedMarkets: [
        { question: 'ETH ETF approved by May?', probability: 45, probabilityLabel: 'YES' },
        { question: 'Bitcoin hits $50k this week?', probability: 30, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(92, 15)
    },
    {
      id: '2',
      headline: 'Taiwan Election: DPP candidate maintains lead in final polling days.',
      source: 'Kalshi',
      volume: '$850k',
      changePercent: -2,
      probability: 64,
      probabilityLabel: 'WIN',
      timeSlot: '08:00',
      rank: 2,
      narrative: 'Latest polling aggregates show the Democratic Progressive Party candidate holding a steady lead, though the margin has tightened slightly. Markets reflect increasing confidence despite geopolitical tensions.',
      relatedMarkets: [
        { question: 'China responds with sanctions?', probability: 38, probabilityLabel: 'YES' },
        { question: 'US official visits Taiwan this month?', probability: 72, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(64, 8)
    },
    {
      id: '3',
      headline: 'Taylor Swift / Kelce engagement rumors cool off.',
      source: 'Polymarket',
      volume: '$120k',
      changePercent: -30,
      probability: 12,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 3,
      narrative: 'Social media speculation has dropped sharply after both parties were spotted at separate events without engagement rings. Market sentiment has reversed from last week\'s optimistic spike.',
      relatedMarkets: [
        { question: 'Super Bowl halftime appearance?', probability: 8, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(12, 20)
    },
    {
      id: '4',
      headline: 'OpenAI GPT-5 release pushed to Q2 2025.',
      source: 'Manifold',
      volume: '$2.1M',
      changePercent: -18,
      probability: 23,
      probabilityLabel: 'Q1',
      timeSlot: '08:00',
      rank: 4,
      narrative: 'Internal sources suggest compute limitations and safety testing requirements are causing delays. Q2 probability has surged to 68% as Q1 becomes increasingly unlikely.',
      relatedMarkets: [
        { question: 'GPT-5 released in 2025?', probability: 89, probabilityLabel: 'YES' },
        { question: 'OpenAI valuation exceeds $100B?', probability: 76, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(23, 12)
    },
    {
      id: '5',
      headline: 'Fed holds rates steady at January meeting.',
      source: 'Kalshi',
      volume: '$6.8M',
      changePercent: 3,
      probability: 94,
      probabilityLabel: 'HOLD',
      timeSlot: '08:00',
      rank: 5,
      narrative: 'Near-certain consensus that the Federal Reserve will maintain current interest rates. Recent inflation data supports the hold position, with only marginal shifts in market probability.',
      relatedMarkets: [
        { question: 'First rate cut in March?', probability: 42, probabilityLabel: 'YES' },
        { question: 'Two+ cuts by July?', probability: 61, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(94, 3)
    },
    {
      id: '6',
      headline: 'Apple Vision Pro pre-orders exceed 200k units.',
      source: 'Polymarket',
      volume: '$890k',
      changePercent: 8,
      probability: 71,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 6,
      narrative: 'Supply chain data and retail leaks suggest strong initial demand. Analysts predict sellout within first week, driving market probability higher.',
      relatedMarkets: [
        { question: 'Vision Pro 2 announced this year?', probability: 15, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(71, 10)
    },
    {
      id: '7',
      headline: 'SpaceX Starship completes orbital test flight.',
      source: 'Kalshi',
      volume: '$1.5M',
      changePercent: 22,
      probability: 67,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 7,
      narrative: 'FAA approval received for test window this month. Weather conditions favorable and vehicle prep on schedule. Market sentiment has shifted dramatically upward.',
      relatedMarkets: [
        { question: 'Starship reaches orbit in Q1?', probability: 67, probabilityLabel: 'YES' },
        { question: 'Moon mission before 2026?', probability: 34, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(67, 18)
    },
    {
      id: '8',
      headline: 'Reddit IPO filing submitted to SEC.',
      source: 'Manifold',
      volume: '$450k',
      changePercent: 12,
      probability: 88,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 8,
      narrative: 'Multiple sources confirm confidential filing completed. Public filing expected within weeks, with IPO likely in Q1 2025.',
      relatedMarkets: [
        { question: 'Reddit IPO values company >$15B?', probability: 54, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(88, 8)
    },
    {
      id: '9',
      headline: 'Major AI lab announces AGI breakthrough.',
      source: 'Polymarket',
      volume: '$3.2M',
      changePercent: -5,
      probability: 6,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 9,
      narrative: 'Despite ongoing speculation, no credible leaks or indicators of imminent AGI announcement. Market remains highly skeptical of near-term breakthrough claims.',
      relatedMarkets: [
        { question: 'AGI by end of 2025?', probability: 18, probabilityLabel: 'YES' },
        { question: 'AGI by end of 2030?', probability: 52, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(6, 4)
    },
    {
      id: '10',
      headline: 'Nvidia announces new GPU architecture at GTC.',
      source: 'Kalshi',
      volume: '$2.7M',
      changePercent: 4,
      probability: 82,
      probabilityLabel: 'YES',
      timeSlot: '08:00',
      rank: 10,
      narrative: 'GTC keynote traditionally includes major product announcements. Supply chain indicators and insider chatter suggest new architecture reveal is highly likely.',
      relatedMarkets: [
        { question: 'Nvidia stock hits $1000 in 2025?', probability: 41, probabilityLabel: 'YES' }
      ],
      chartData: generateChartData(82, 6)
    }
  ],
  '14:00': [
    {
      id: '11',
      headline: 'UEFA Champions League: Bayern advances to semifinals.',
      source: 'Polymarket',
      volume: '$1.8M',
      changePercent: 7,
      probability: 73,
      probabilityLabel: 'YES',
      timeSlot: '14:00',
      rank: 1,
      narrative: 'Strong form and favorable draw position Bayern as frontrunners. Market confidence has grown following recent performances.',
      chartData: generateChartData(73, 9)
    },
    {
      id: '12',
      headline: 'Netflix password sharing crackdown increases subscriptions.',
      source: 'Kalshi',
      volume: '$950k',
      changePercent: -3,
      probability: 68,
      probabilityLabel: 'YES',
      timeSlot: '14:00',
      rank: 2,
      narrative: 'Early data suggests policy change driving net subscriber growth, though slightly below initial market expectations.',
      chartData: generateChartData(68, 8)
    }
  ],
  '20:00': [
    {
      id: '21',
      headline: 'Grammy Awards: Beyoncé wins Album of the Year.',
      source: 'Polymarket',
      volume: '$680k',
      changePercent: 11,
      probability: 79,
      probabilityLabel: 'YES',
      timeSlot: '20:00',
      rank: 1,
      narrative: 'Critical acclaim and industry sentiment strongly favor this outcome. Historical voting patterns support the elevated probability.',
      chartData: generateChartData(79, 10)
    }
  ]
};

export const getCurrentTimeSlot = (): TimeSlot => {
  const hour = new Date().getHours();
  if (hour < 14) return '08:00';
  if (hour < 20) return '14:00';
  return '20:00';
};

export const getTimeSlotStatus = (slot: TimeSlot): 'active' | 'past' | 'future' => {
  const now = new Date();
  const currentHour = now.getHours();
  const slotHour = parseInt(slot.split(':')[0]);
  
  if (slotHour < 8) return 'future';
  
  if (currentHour >= slotHour && currentHour < slotHour + 6) {
    return 'active';
  } else if (currentHour >= slotHour + 6 || slotHour === 20 && currentHour < 8) {
    return 'past';
  } else {
    return 'future';
  }
};
