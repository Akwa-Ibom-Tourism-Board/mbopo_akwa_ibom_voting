import styled from "styled-components";
import type { Candidate } from "@/features/voting/types";
import { CandidateCard } from "./CandidateCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
  /* Room for the hover lift + glow so it isn't clipped by overflow ancestors. */
  padding: 14px 0;
`;

export function CandidateGrid({ candidates }: { candidates: Candidate[] }) {
  return (
    <Grid>
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </Grid>
  );
}
