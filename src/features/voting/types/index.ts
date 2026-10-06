export interface Candidate {
  id: string;
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
