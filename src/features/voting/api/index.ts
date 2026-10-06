import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MOCK_CANDIDATES } from "@/features/voting/data/mock-candidates";
import { VOTING_DEADLINE_ISO } from "@/features/voting/data/voting-deadline";
import { VOTE_PRICE_NAIRA, VOTE_TIERS } from "@/features/voting/data/vote-tiers";
import type {
  Candidate,
  VotePurchase,
  VotePurchaseResult,
  VoteTier,
  VotingOverview,
} from "@/features/voting/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CandidateFilters {
  search?: string;
  lga?: string;
}

export async function getCandidates(params?: CandidateFilters): Promise<Candidate[]> {
  await delay(300);
  const search = params?.search?.trim().toLowerCase() ?? "";
  const lga = params?.lga?.trim() ?? "";

  return MOCK_CANDIDATES.filter((candidate) => {
    const matchesSearch =
      !search ||
      candidate.name.toLowerCase().includes(search) ||
      candidate.lga.toLowerCase().includes(search);
    const matchesLga = !lga || candidate.lga === lga;
    return matchesSearch && matchesLga;
  });
}

export async function getCandidate(id: string): Promise<Candidate | null> {
  await delay(250);
  return MOCK_CANDIDATES.find((candidate) => candidate.id === id) ?? null;
}

export async function getVotingOverview(): Promise<VotingOverview> {
  await delay(200);
  const totalVotes = MOCK_CANDIDATES.reduce((sum, candidate) => sum + candidate.voteCount, 0);
  const leaderboard = [...MOCK_CANDIDATES]
    .sort((a, b) => b.voteCount - a.voteCount)
    .map((candidate, index) => ({
      rank: index + 1,
      candidate,
      percent: totalVotes ? (candidate.voteCount / totalVotes) * 100 : 0,
    }));

  return {
    deadline: VOTING_DEADLINE_ISO,
    pricePerVote: VOTE_PRICE_NAIRA,
    candidateCount: MOCK_CANDIDATES.length,
    totalVotes,
    leaderboard,
  };
}

export async function getVoteTiers(): Promise<VoteTier[]> {
  await delay(200);
  return [...VOTE_TIERS];
}

// TODO(payment-integration): replace this simulated flow with a real
// redirect to the payment gateway (Paystack/Flutterwave are the standard
// choice for NGN) and a server-confirmed vote credit once the backend
// exists. Today: wait ~1s (the "Redirecting to payment…" state), pretend the
// payment succeeded, and credit the votes in the local mock store.
export async function submitVotePurchase({
  candidateId,
  votes,
  amountNaira,
}: VotePurchase): Promise<VotePurchaseResult> {
  await delay(1000);

  if (amountNaira !== votes * VOTE_PRICE_NAIRA) {
    throw new Error("Payment amount does not match the number of votes");
  }

  const candidate = MOCK_CANDIDATES.find((item) => item.id === candidateId);
  if (!candidate) {
    throw new Error("Candidate not found");
  }

  candidate.voteCount += votes;

  return {
    candidateId,
    votes,
    amountNaira,
    updatedVoteCount: candidate.voteCount,
  };
}

export function useCandidates(params?: CandidateFilters) {
  return useQuery({
    queryKey: ["candidates", params],
    queryFn: () => getCandidates(params),
    placeholderData: keepPreviousData,
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => getCandidate(id),
    enabled: Boolean(id),
  });
}

export function useVotingOverview() {
  return useQuery({
    queryKey: ["voting-overview"],
    queryFn: getVotingOverview,
  });
}

export function useVoteTiers() {
  return useQuery({
    queryKey: ["vote-tiers"],
    queryFn: getVoteTiers,
  });
}

export function useSubmitVotePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitVotePurchase,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["candidates"] }),
        queryClient.invalidateQueries({ queryKey: ["candidate"] }),
        queryClient.invalidateQueries({ queryKey: ["voting-overview"] }),
      ]),
  });
}
