"use client";

import { useTheme } from "./ThemeProvider";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="border-b border-divider pb-4 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            SIGNAL NEWS
          </h1>
          <p className="text-accent font-mono text-sm mt-1">{formattedDate}</p>
        </div>
        <button
          onClick={toggleTheme}
          className="text-accent hover:text-foreground transition-colors font-mono text-xs p-2 border border-divider hover:border-accent"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "[ LIGHT ]" : "[ DARK ]"}
        </button>
      </div>
    </header>
  );
}
