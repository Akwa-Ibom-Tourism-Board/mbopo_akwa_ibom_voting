import { useState } from "react";
import styled from "styled-components";
import { Container, PageHeroBanner, PageSection, StateMessage } from "@/shared/components";
import { useDebouncedValue } from "@/shared/hooks";
import { media } from "@/theme";
import { useCandidates } from "@/features/voting/api";
import { CandidateGrid, LgaFilter, SearchBar, VotingCountdown } from "@/features/voting/components";
import { ALL_LGAS } from "@/features/voting/constants";

const SEARCH_DEBOUNCE_MS = 150;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 20px;

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
`;

const ResultCount = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
`;

export function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [lga, setLga] = useState(ALL_LGAS);
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, isError } = useCandidates({
    search: debouncedSearch,
    lga: lga === ALL_LGAS ? undefined : lga,
  });

  return (
    <>
      <PageHeroBanner
        eyebrow="Public Vote"
        title="Vote for Your Mbopo Akwa Ibom"
        subtitle="Support the candidate you believe best represents the beauty, culture, and ambition of Akwa Ibom."
      >
        <VotingCountdown />
      </PageHeroBanner>
      <PageSection>
        <Container>
          <Toolbar>
            <SearchBar value={search} onChange={setSearch} />
            <LgaFilter value={lga} onChange={setLga} />
          </Toolbar>

          {isLoading && <StateMessage title="Loading candidates…" />}
          {isError && (
            <StateMessage
              title="Unable to load candidates"
              message="Something went wrong. Please try again shortly."
            />
          )}

          {data && (
            <>
              <ResultCount aria-live="polite">
                {data.length} {data.length === 1 ? "candidate" : "candidates"}
              </ResultCount>
              {data.length === 0 ? (
                <StateMessage
                  title="No candidates found"
                  message="Try a different name or choose another LGA."
                />
              ) : (
                <CandidateGrid candidates={data} />
              )}
            </>
          )}
        </Container>
      </PageSection>
    </>
  );
}
