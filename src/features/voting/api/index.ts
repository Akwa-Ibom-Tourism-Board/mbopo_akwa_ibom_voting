import { useMutation, useQuery } from "@tanstack/react-query";
import { MOCK_CANDIDATES } from "@/features/voting/data/mock-candidates";
import type { Candidate, VotePurchase, VoteTier } from "@/features/voting/types";
import { VOTE_TIERS } from "@/features/voting/data/vote-tiers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCandidates(params?: {
  search?: string;
  lga?: string;
}): Promise<Candidate[]> {
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

export async function getCandidate(id: string): Promise<Candidate | undefined> {
  await delay(250);
  return MOCK_CANDIDATES.find((candidate) => candidate.id === id);
}

export async function getVoteTiers(): Promise<VoteTier[]> {
  await delay(200);
  return [...VOTE_TIERS];
}

export async function submitVotePurchase({
  candidateId,
  votes,
  amountNaira,
}: VotePurchase): Promise<{
  success: true;
  candidateId: string;
  votes: number;
  amountNaira: number;
  updatedVoteCount: number;
}> {
  await delay(1000);

  const index = MOCK_CANDIDATES.findIndex((candidate) => candidate.id === candidateId);
  if (index === -1) {
    throw new Error("Candidate not found");
  }

  const updatedCandidate = {
    ...MOCK_CANDIDATES[index],
    voteCount: MOCK_CANDIDATES[index].voteCount + votes,
  };

  MOCK_CANDIDATES[index] = updatedCandidate;

  return {
    success: true,
    candidateId,
    votes,
    amountNaira,
    updatedVoteCount: updatedCandidate.voteCount,
  };
}

export function useCandidates(params?: { search?: string; lga?: string }) {
  return useQuery({
    queryKey: ["candidates", params],
    queryFn: () => getCandidates(params),
  });
}

export function useCandidate(id: string) {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => getCandidate(id),
    enabled: Boolean(id),
  });
}

export function useVoteTiers() {
  return useQuery({
    queryKey: ["vote-tiers"],
    queryFn: getVoteTiers,
  });
}

export function useSubmitVotePurchase() {
  return useMutation({
    mutationFn: submitVotePurchase,
  });
}
