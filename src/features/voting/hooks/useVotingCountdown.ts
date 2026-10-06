import { useEffect, useState } from "react";
import { useVotingOverview } from "@/features/voting/api";

const SECOND_MS = 1000;

export interface VotingCountdown {
  isLoading: boolean;
  isOpen: boolean;
  hours: number;
  minutes: number;
  seconds: number;
}

// Remaining time is expressed in total hours (not days) — e.g. 71h 59m 12s.
export function useVotingCountdown(): VotingCountdown {
  const { data, isLoading } = useVotingOverview();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), SECOND_MS);
    return () => clearInterval(interval);
  }, []);

  const remainingMs = data ? Math.max(0, new Date(data.deadline).getTime() - now) : 0;
  const totalSeconds = Math.floor(remainingMs / SECOND_MS);

  return {
    isLoading,
    isOpen: Boolean(data) && remainingMs > 0,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
