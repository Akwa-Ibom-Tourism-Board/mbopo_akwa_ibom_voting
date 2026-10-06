import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container, PageSection, StateMessage } from "@/shared/components";
import { Button, Card, Input, Label, sonnerToast } from "@/shared/ui";
import { digitsOnlyOnChange, voteQuantitySchema } from "@/lib/validation";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { media } from "@/theme";
import { useCandidate, useSubmitVotePurchase, useVoteTiers } from "@/features/voting/api";
import { VOTE_PRICE_NAIRA } from "@/features/voting/data/vote-tiers";
import {
  ScoreDisclaimerBadge,
  VoteTierPicker,
  VotingCountdown,
} from "@/features/voting/components";
import { useVotingCountdown } from "@/features/voting/hooks";
import type { VoteConfirmationState } from "@/features/voting/types";

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.875rem;
  font-weight: 700;
`;

const CountdownWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.gradients.panel};
`;

const CandidateSummary = styled(Card)`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    object-position: top;
    border-radius: ${({ theme }) => theme.radii["2xl"]};
  }

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }

  p {
    margin: 2px 0 0;
    color: ${({ theme }) => theme.colors.muted.foreground};
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const Panel = styled(Card)`
  display: grid;
  gap: 20px;
  padding: 24px;

  ${media.md} {
    padding: 32px;
  }
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
`;

const FieldError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
`;

const Total = styled.div`
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.06)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 1.15rem;
`;

const Rate = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.8125rem;
`;

const Checkout = styled.div`
  display: grid;
  gap: 14px;
  justify-items: start;

  button {
    width: 100%;
  }
`;

interface FormValues {
  votes: number;
}

export function VotePurchasePage() {
  const { candidateId = "" } = useParams();
  const navigate = useNavigate();
  const { data: candidate, isLoading, isError } = useCandidate(candidateId);
  const { data: tiers = [] } = useVoteTiers();
  const purchase = useSubmitVotePurchase();
  const { isOpen: votingOpen, isLoading: countdownLoading } = useVotingCountdown();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(voteQuantitySchema),
    defaultValues: { votes: 1 },
    mode: "onChange",
  });

  // The input yields a string at runtime (the resolver coerces it on submit),
  // so normalise here. This single value drives both the tier highlight and
  // the custom field, which keeps them in sync with no extra state.
  const votes = Math.floor(Number(watch("votes"))) || 0;
  const totalNaira = votes * VOTE_PRICE_NAIRA;
  const isValidQuantity = votes > 0 && !errors.votes;

  if (isLoading) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage title="Loading…" />
        </Container>
      </PageSection>
    );
  }

  if (!countdownLoading && !votingOpen) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage
            title="Voting has closed"
            message="The voting deadline has passed, so new votes can no longer be bought."
            actionTo="/voting"
            actionLabel="Back to voting"
          />
        </Container>
      </PageSection>
    );
  }

  if (isError || !candidate) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage
            title="Candidate not found"
            message="We couldn't find the candidate you're trying to vote for."
            actionTo="/voting"
            actionLabel="Back to voting"
          />
        </Container>
      </PageSection>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    const purchasedVotes = Number(values.votes);
    const amountNaira = purchasedVotes * VOTE_PRICE_NAIRA;

    try {
      const result = await purchase.mutateAsync({
        candidateId: candidate.id,
        votes: purchasedVotes,
        amountNaira,
      });
      const state: VoteConfirmationState = {
        votes: result.votes,
        amountNaira: result.amountNaira,
        updatedVoteCount: result.updatedVoteCount,
      };
      navigate(`/voting/${candidate.id}/vote/confirmation`, { state });
    } catch {
      sonnerToast.error("Payment could not be completed. Please try again.");
    }
  });

  return (
    <PageSection $clearHeader>
      <Container $maxWidth={720}>
        <BackLink to={`/voting/${candidate.id}`}>
          <ArrowLeft size={16} aria-hidden /> Back to {candidate.name}
        </BackLink>

        <CountdownWrap>
          <VotingCountdown />
        </CountdownWrap>

        <CandidateSummary>
          <img src={candidate.photo} alt="" />
          <div>
            <h1>{candidate.name}</h1>
            <p>{candidate.lga}</p>
          </div>
        </CandidateSummary>

        <Panel as="form" onSubmit={onSubmit} noValidate>
          <PanelTitle>Choose how many votes</PanelTitle>

          <VoteTierPicker
            tiers={tiers}
            selectedVotes={votes}
            onSelect={(next) => setValue("votes", next, { shouldValidate: true })}
          />

          <Field>
            <Label htmlFor="custom-votes">Or enter a custom number of votes</Label>
            <Input
              id="custom-votes"
              inputMode="numeric"
              autoComplete="off"
              invalid={Boolean(errors.votes)}
              {...register("votes", {
                onChange: (event) => {
                  event.target.value = digitsOnlyOnChange(event.target.value);
                },
              })}
            />
            {errors.votes && <FieldError role="alert">{errors.votes.message}</FieldError>}
          </Field>

          <div>
            <Total aria-live="polite">
              <strong>
                {formatNumber(votes)} {votes === 1 ? "vote" : "votes"} —{" "}
                {formatCurrency(totalNaira)}
              </strong>
            </Total>
            <Rate>{formatCurrency(VOTE_PRICE_NAIRA)} per vote</Rate>
          </div>

          <Checkout>
            {/* <ScoreDisclaimerBadge /> */}
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              disabled={!isValidQuantity || purchase.isPending}
            >
              {purchase.isPending ? "Redirecting to payment…" : "Proceed to Pay"}
            </Button>
          </Checkout>
        </Panel>
      </Container>
    </PageSection>
  );
}
