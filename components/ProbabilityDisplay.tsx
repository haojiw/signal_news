"use client";

import { cn } from '@/lib/utils';

type SignalDirection = 'up' | 'down' | 'neutral';

interface ProbabilityDisplayProps {
  probability: number;
  label: string;
  changePercent?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLabel?: boolean;
}

const sizeStyles = {
  sm: {
    number: 'text-2xl',
    numberStyle: { fontSize: '1.5rem', lineHeight: 0.9, letterSpacing: '-0.03em' },
    label: 'text-[0.5rem] mt-1',
  },
  md: {
    number: 'text-4xl',
    numberStyle: { fontSize: '2.5rem', lineHeight: 0.9, letterSpacing: '-0.03em' },
    label: 'text-[0.5625rem] mt-2',
  },
  lg: {
    number: 'text-6xl',
    numberStyle: { fontSize: '4rem', lineHeight: 0.9, letterSpacing: '-0.04em' },
    label: 'text-[0.625rem] mt-3',
  },
  xl: {
    number: 'text-8xl',
    numberStyle: { fontSize: '6rem', lineHeight: 0.85, letterSpacing: '-0.05em' },
    label: 'text-xs mt-4',
  },
} as const;

function getDirection(changePercent?: number): SignalDirection {
  if (changePercent === undefined) return 'neutral';
  if (changePercent > 0) return 'up';
  if (changePercent < 0) return 'down';
  return 'neutral';
}

function getDirectionColor(direction: SignalDirection): string {
  switch (direction) {
    case 'up':
      return 'text-signal-up';
    case 'down':
      return 'text-signal-down';
    default:
      return 'text-signal-neutral';
  }
}

export function ProbabilityDisplay({
  probability,
  label,
  changePercent,
  size = 'lg',
  className,
  showLabel = true,
}: ProbabilityDisplayProps) {
  const direction = getDirection(changePercent);
  const colorClass = getDirectionColor(direction);
  const styles = sizeStyles[size];

  return (
    <div className={cn("text-right", className)}>
      <div
        className={cn("font-mono font-black", colorClass)}
        style={styles.numberStyle}
      >
        {probability}
      </div>
      {showLabel && (
        <div className={cn("font-mono text-muted-foreground tracking-widest uppercase", styles.label)}>
          {label}
        </div>
      )}
    </div>
  );
}

// Export utility functions for external use
export { getDirection, getDirectionColor };
export type { SignalDirection };
