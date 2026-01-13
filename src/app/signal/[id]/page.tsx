"use client";

import { useParams, useRouter } from "next/navigation";
import { getSignalById } from "@/data/mockData";
import { ProbabilityChart } from "@/components/ProbabilityChart";
import { RelatedMarkets } from "@/components/RelatedMarkets";
import { useTheme } from "@/components/ThemeProvider";
import { notFound } from "next/navigation";

export default function SignalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  const id = params.id as string;
  const signal = getSignalById(id);

  if (!signal) {
    notFound();
  }

  const isPositive = signal.direction === "up";
  const probabilityColor = isPositive ? "text-signal-up" : "text-signal-down";

  return (
    <main className="min-h-screen bg-background page-transition">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header with back button */}
        <header className="flex items-center justify-between border-b border-divider pb-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-foreground hover:text-signal-up transition-colors font-mono text-sm"
            >
              &lt; BACK
            </button>
            <h1 className="text-sm font-bold tracking-tight text-foreground uppercase truncate max-w-[200px]">
              {signal.headline.split(".")[0]}
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="text-accent hover:text-foreground transition-colors font-mono text-xs p-2 border border-divider hover:border-accent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </header>

        {/* Main probability display */}
        <section className="text-center mb-6 border-b border-divider pb-6">
          <div className={`font-mono text-4xl font-bold ${probabilityColor} mb-2`}>
            [ {signal.probability}% {signal.outcome} ]
          </div>
          <p className="text-accent font-mono text-sm">
            {signal.market} // Total Vol: {signal.volume}
          </p>
        </section>

        {/* Chart */}
        <section className="mb-6">
          <ProbabilityChart data={signal.chartData} direction={signal.direction} />
        </section>

        {/* AI Narrative */}
        <section className="mb-6 border-b border-divider pb-6">
          <h3 className="text-accent font-mono text-xs tracking-wider mb-3 border-b border-divider pb-2">
            THE NARRATIVE (AI SUMMARY):
          </h3>
          <p className="text-foreground leading-relaxed text-sm">
            {signal.narrative}
          </p>
        </section>

        {/* Related Markets */}
        <RelatedMarkets markets={signal.relatedMarkets} />

        {/* External link button */}
        <a
          href={signal.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-8 py-3 border-2 border-signal-up text-signal-up font-mono text-center hover:bg-signal-up hover:text-background transition-colors"
        >
          VIEW LIVE ON {signal.market.toUpperCase()}
        </a>
      </div>
    </main>
  );
}
