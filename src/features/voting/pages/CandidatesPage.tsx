import { useMemo, useState } from "react";
import styled from "styled-components";
import { Info, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeroBanner } from "@/shared/components";
import { useCandidates } from "@/features/voting/api";
import { AKWA_IBOM_LGAS } from "@/features/voting/data/mock-candidates";
import { formatNumber } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 24px 0 32px;

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1.2fr) 240px;
  }
`;

const SearchWrap = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0 18px;
  height: 52px;
`;

const SearchInput = styled.input`
  border: 0;
  background: transparent;
  width: 100%;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 52px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  padding: 0 18px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const ResultsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
`;

const Card = styled.article`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 0 0 18px;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)}, ${({ theme }) => theme.shadows.xl};
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  padding: 18px 18px 0;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.45rem;
`;

const Lga = styled.p`
  margin: 4px 0 14px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Tagline = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 0.95rem;
  min-height: 38px;
`;

const VoteCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray500};
`;

const VoteCountValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 1rem;
  font-weight: 800;
`;

const Disclaimer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.73rem;
  font-weight: 700;
`;

const CardActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 18px;
  margin-top: 10px;
`;

const DetailButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 700;
`;

const VoteButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-weight: 700;
`;

const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 36px 20px;
  text-align: center;
`;

export function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [lga, setLga] = useState("All LGAs");

  const { data, isLoading, isError } = useCandidates({
    search: search.trim(),
    lga: lga === "All LGAs" ? undefined : lga,
  });

  const resultCount = useMemo(() => data?.length ?? 0, [data]);

  return (
    <PageWrap>
      <PageHeroBanner
        eyebrow="Vote"
        title="Vote for Mbopo Akwa Ibom"
        subtitle="Support the candidates you believe deserve to represent the beauty, culture, and ambition of Akwa Ibom."
      />

      <Container>
        <Toolbar>
          <SearchWrap>
            <Search size={18} color="#6B7280" />
            <SearchInput
              value={search}
              placeholder="Search by candidate or LGA"
              onChange={(event) => setSearch(event.target.value)}
            />
          </SearchWrap>

          <Select value={lga} onChange={(event) => setLga(event.target.value)}>
            <option>All LGAs</option>
            {AKWA_IBOM_LGAS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Toolbar>

        <ResultsMeta>
          <span>{resultCount} candidates</span>
          <span>{search || lga !== "All LGAs" ? "Filtered results" : "All candidates"}</span>
        </ResultsMeta>

        {isLoading && <p>Loading candidates...</p>}
        {isError && <p>Unable to load candidates right now.</p>}

        {!isLoading && data && data.length === 0 && (
          <EmptyState>
            <h3>No candidates match your filters.</h3>
            <p>Try widening the search or choosing a different LGA.</p>
          </EmptyState>
        )}

        {!isLoading && data && data.length > 0 && (
          <Grid>
            {data.map((candidate) => (
              <Card key={candidate.id}>
                <Photo src={candidate.photo} alt={candidate.name} />
                <Body>
                  <Name>{candidate.name}</Name>
                  <Lga>{candidate.lga}</Lga>
                  {candidate.tagline && <Tagline>{candidate.tagline}</Tagline>}
                  <VoteCount>
                    <span>Votes</span>
                    <VoteCountValue>{formatNumber(candidate.voteCount)}</VoteCountValue>
                  </VoteCount>
                  <Disclaimer>
                    <Info size={12} />
                    Public votes count for 10% of the final score
                  </Disclaimer>
                </Body>
                <CardActions>
                  <DetailButton to={`/voting/${candidate.id}`}>View Details</DetailButton>
                  <VoteButton to={`/voting/${candidate.id}/vote`}>Vote Now</VoteButton>
                </CardActions>
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </PageWrap>
  );
}
