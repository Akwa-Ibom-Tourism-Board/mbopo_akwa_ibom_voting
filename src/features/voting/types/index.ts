export interface Candidate {
  id: string;
  number: number;
  name: string;
  lga: string;
  tagline?: string;
  photo: string;
  gallery?: string[];
  videoUrls?: string[];
  story: string[];
  voteCount: number;
  publicVoteWeightPercent: 10;
}

export interface VoteTier {
  votes: number;
  priceNaira: number;
}

export interface VotePurchase {
  candidateId: string;
  votes: number;
  amountNaira: number;
}

export interface VotePurchaseResult extends VotePurchase {
  updatedVoteCount: number;
}

// Passed via router state by VotePurchasePage. When a real payment gateway
// is wired in, this page becomes the callback target: read the payment
// reference from the URL, verify it with the backend, then render this view.
export interface VoteConfirmationState {
  votes: number;
  amountNaira: number;
  updatedVoteCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  candidate: Candidate;
  percent: number;
}

export interface VotingOverview {
  deadline: string; // ISO date
  pricePerVote: number;
  candidateCount: number;
  totalVotes: number;
  leaderboard: LeaderboardEntry[];
}
