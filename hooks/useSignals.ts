"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { NewsSignal, TimeSlot } from '@/types/news';
import { mockNewsData, getCurrentTimeSlot, getTimeSlotStatus } from '@/lib/mockData';

interface UseSignalsOptions {
  initialTimeSlot?: TimeSlot;
}

interface UseSignalsReturn {
  signals: NewsSignal[];
  currentTimeSlot: TimeSlot;
  setTimeSlot: (slot: TimeSlot) => void;
  selectedSignal: NewsSignal | null;
  selectSignal: (signal: NewsSignal | null) => void;
  isLoading: boolean;
  error: Error | null;
  getTimeSlotStatus: (slot: TimeSlot) => 'active' | 'past' | 'future';
}

/**
 * Custom hook for managing signal data and state.
 * Designed to be easily swapped from mock data to real API calls.
 */
export function useSignals(options: UseSignalsOptions = {}): UseSignalsReturn {
  const { initialTimeSlot } = options;
  
  const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>(
    initialTimeSlot ?? getCurrentTimeSlot()
  );
  const [selectedSignal, setSelectedSignal] = useState<NewsSignal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize signals to prevent unnecessary re-renders
  const signals = useMemo(() => {
    return mockNewsData[currentTimeSlot] || [];
  }, [currentTimeSlot]);

  const setTimeSlot = useCallback((slot: TimeSlot) => {
    setCurrentTimeSlot(slot);
    // Clear selected signal when changing time slots
    setSelectedSignal(null);
  }, []);

  const selectSignal = useCallback((signal: NewsSignal | null) => {
    setSelectedSignal(signal);
  }, []);

  // This effect simulates async data fetching
  // Replace with real API call when ready
  useEffect(() => {
    const fetchSignals = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay (remove in production)
        // await new Promise(resolve => setTimeout(resolve, 100));
        
        // In production, this would be:
        // const response = await fetch(`/api/signals?timeSlot=${currentTimeSlot}`);
        // const data = await response.json();
        // setSignals(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch signals'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignals();
  }, [currentTimeSlot]);

  return {
    signals,
    currentTimeSlot,
    setTimeSlot,
    selectedSignal,
    selectSignal,
    isLoading,
    error,
    getTimeSlotStatus,
  };
}

/**
 * Hook for fetching a single signal by ID.
 * Useful for direct navigation to signal detail pages.
 */
export function useSignal(signalId: string | null): {
  signal: NewsSignal | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [signal, setSignal] = useState<NewsSignal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!signalId) {
      setSignal(null);
      return;
    }

    const fetchSignal = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Search through all time slots for the signal
        for (const timeSlot of Object.keys(mockNewsData) as TimeSlot[]) {
          const found = mockNewsData[timeSlot].find(s => s.id === signalId);
          if (found) {
            setSignal(found);
            return;
          }
        }
        setSignal(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch signal'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignal();
  }, [signalId]);

  return { signal, isLoading, error };
}
