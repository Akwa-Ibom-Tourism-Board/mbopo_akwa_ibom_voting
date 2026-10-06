import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Container, PageSection, StateMessage } from "@/shared/components";
import { Button, Card } from "@/shared/ui";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useCandidate } from "@/features/voting/api";
import type { VoteConfirmationState } from "@/features/voting/types";

const Box = styled(Card)`
  padding: 40px 24px;
  text-align: center;
`;

const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  line-height: 1.7;
`;

const Stats = styled.dl`
  display: grid;
  gap: 0;
  margin: 28px 0;
  text-align: left;

  div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  dt {
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  dd {
    margin: 0;
    font-weight: 700;
    text-align: right;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

export function VoteConfirmationPage() {
  const { candidateId = "" } = useParams();
  const location = useLocation();
  const state = location.state as VoteConfirmationState | null;
  const { data: candidate, isLoading } = useCandidate(candidateId);

  if (isLoading) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage title="Loading…" />
        </Container>
      </PageSection>
    );
  }

  // Direct visit/refresh with no purchase in session: nothing to confirm.
  if (!candidate || !state) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage
            title="No recent vote to show"
            message="Start a vote to see its confirmation here."
            actionTo={candidate ? `/voting/${candidate.id}/vote` : "/voting"}
            actionLabel={candidate ? "Vote now" : "Back to voting"}
          />
        </Container>
      </PageSection>
    );
  }

  return (
    <PageSection $clearHeader>
      <Container $maxWidth={720}>
        <Box>
          <Icon>
            <CheckCircle2 size={36} aria-hidden />
          </Icon>
          <Title>Votes recorded — thank you!</Title>
          <Lead>
            Your {formatNumber(state.votes)} {state.votes === 1 ? "vote has" : "votes have"} been
            added for {candidate.name}.
          </Lead>

          <Stats>
            <div>
              <dt>Candidate</dt>
              <dd>{candidate.name}</dd>
            </div>
            <div>
              <dt>Votes purchased</dt>
              <dd>{formatNumber(state.votes)}</dd>
            </div>
            <div>
              <dt>Amount paid</dt>
              <dd>{formatCurrency(state.amountNaira)}</dd>
            </div>
            <div>
              <dt>{candidate.name}'s total votes</dt>
              <dd>{formatNumber(candidate.voteCount)}</dd>
            </div>
          </Stats>

          <Actions>
            <Button asChild>
              <Link to={`/voting/${candidate.id}`}>View {candidate.name}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/voting">Back to all candidates</Link>
            </Button>
          </Actions>
        </Box>
      </Container>
    </PageSection>
  );
}
