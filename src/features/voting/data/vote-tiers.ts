import type { VoteTier } from "@/features/voting/types";

export const VOTE_TIERS: VoteTier[] = [
  { votes: 1, priceNaira: 100 },
  { votes: 5, priceNaira: 500 },
  { votes: 10, priceNaira: 1000 },
  { votes: 20, priceNaira: 2000 },
  { votes: 50, priceNaira: 5000 },
  { votes: 100, priceNaira: 10000 },
];
