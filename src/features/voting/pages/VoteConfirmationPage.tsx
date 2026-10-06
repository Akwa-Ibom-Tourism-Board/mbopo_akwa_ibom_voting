import styled from "styled-components";
import { CheckCircle2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCandidate } from "@/features/voting/api";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(760px, calc(100% - 32px));
  margin: 0 auto;
`;

const Box = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const IconWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
`;

const Summary = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.7;
`;

const StatList = styled.div`
  display: grid;
  gap: 12px;
  text-align: left;
  margin: 24px 0 28px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-weight: 700;
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 700;
`;

export function VoteConfirmationPage() {
  const { candidateId } = useParams();
  const { state } = useLocation();
  const { data: candidate } = useCandidate(candidateId ?? "");

  const purchasedVotes = Number(state?.votes ?? 0);
  const amountNaira = Number(state?.amountNaira ?? purchasedVotes * 100);
  const candidateName = state?.candidateName ?? candidate?.name ?? "Candidate";
  const updatedCount = candidate?.voteCount ? candidate.voteCount : 0;

  return (
    <PageWrap>
      <Container>
        <Box>
          <IconWrap>
            <CheckCircle2 size={36} />
          </IconWrap>
          <Title>Vote purchase successful</Title>
          <Summary>
            Your payment was successful and the vote credit has been recorded for {candidateName}.
          </Summary>

          <StatList>
            <StatRow>
              <span>Candidate</span>
              <strong>{candidateName}</strong>
            </StatRow>
            <StatRow>
              <span>Votes purchased</span>
              <strong>{formatNumber(purchasedVotes)}</strong>
            </StatRow>
            <StatRow>
              <span>Amount paid</span>
              <strong>{formatCurrency(amountNaira)}</strong>
            </StatRow>
            <StatRow>
              <span>Updated vote count</span>
              <strong>{formatNumber(updatedCount)}</strong>
            </StatRow>
          </StatList>

          <Actions>
            <PrimaryLink to={`/voting/${candidateId}`}>View candidate</PrimaryLink>
            <SecondaryLink to="/voting">Back to voting</SecondaryLink>
          </Actions>
        </Box>
      </Container>
    </PageWrap>
  );
}
