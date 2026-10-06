import type { VoteTier } from "@/features/voting/types";

export const VOTE_PRICE_NAIRA = 100;

const TIER_VOTES = [1, 5, 10, 20, 50, 100];

export const VOTE_TIERS: VoteTier[] = TIER_VOTES.map((votes) => ({
  votes,
  priceNaira: votes * VOTE_PRICE_NAIRA,
}));
