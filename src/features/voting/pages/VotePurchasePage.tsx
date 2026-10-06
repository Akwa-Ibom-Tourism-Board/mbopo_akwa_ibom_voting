import { useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCandidate, useSubmitVotePurchase, useVoteTiers } from "@/features/voting/api";
import { voteQuantitySchema, digitsOnlyOnChange } from "@/lib/validation";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
`;

const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 24px;
`;

const CandidatePhoto = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 16px;
`;

const CandidateMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CandidateName = styled.h3`
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.9fr);
    align-items: start;
  }
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 24px;
`;

const TierGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const TierButton = styled.button<{ $active: boolean }>`
  padding: 16px 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.alpha(theme.colors.secondary.DEFAULT, 0.08) : theme.colors.white)};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
`;

const TierValue = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
`;

const TierPrice = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.8rem;
`;

const FormField = styled.label`
  display: block;
  margin-top: 18px;
`;

const LabelText = styled.span`
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
`;

const NumberInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  height: 52px;
  padding: 0 16px;
  font-size: 1rem;
`;

const TotalBox = styled.div`
  margin-top: 20px;
  padding: 18px;
  border-radius: 16px;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.05)};
`;

const TotalText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1.1rem;
  font-weight: 700;
`;

const Disclaimer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.78rem;
  font-weight: 700;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  min-height: 52px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
`;

const ErrorText = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

type FormValues = {
  votes: number;
};

export function VotePurchasePage() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const { data: candidate } = useCandidate(candidateId ?? "");
  const { data: tiers = [] } = useVoteTiers();
  const submitMutation = useSubmitVotePurchase();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(voteQuantitySchema),
    defaultValues: { votes: 1 },
  });

  const currentVotes = form.watch("votes") || 0;
  const totalCost = currentVotes * 100;

  const tierSummary = useMemo(
    () => tiers.find((tier) => tier.votes === currentVotes),
    [tiers, currentVotes],
  );

  if (!candidate) {
    return <PageWrap><Container><h2>Candidate not found</h2><Link to="/voting">Back to voting</Link></Container></PageWrap>;
  }

  const handleTierSelect = (votes: number) => {
    setSelectedTier(votes);
    form.setValue("votes", votes, { shouldValidate: true });
  };

  const handleSubmit = async (values: FormValues) => {
    if (!candidateId) return;

    await submitMutation.mutateAsync({
      candidateId,
      votes: Number(values.votes),
      amountNaira: Number(values.votes) * 100,
    });

    navigate(`/voting/${candidateId}/vote/confirmation`, {
      state: {
        candidateId,
        votes: Number(values.votes),
        amountNaira: Number(values.votes) * 100,
        candidateName: candidate.name,
      },
    });
  };

  return (
    <PageWrap>
      <Container>
        <SummaryCard>
          <CandidatePhoto src={candidate.photo} alt={candidate.name} />
          <CandidateMeta>
            <CandidateName>{candidate.name}</CandidateName>
            <span>{candidate.lga}</span>
          </CandidateMeta>
        </SummaryCard>

        <Grid>
          <Panel>
            <h2>Choose your vote quantity</h2>
            <TierGrid>
              {tiers.map((tier) => (
                <TierButton
                  key={tier.votes}
                  type="button"
                  $active={selectedTier === tier.votes || (tierSummary && tierSummary.votes === tier.votes)}
                  onClick={() => handleTierSelect(tier.votes)}
                >
                  <TierValue>{tier.votes} votes</TierValue>
                  <TierPrice>{formatCurrency(tier.priceNaira)}</TierPrice>
                </TierButton>
              ))}
            </TierGrid>

            <FormField>
              <LabelText>Custom quantity</LabelText>
              <NumberInput
                type="number"
                min={1}
                max={10000}
                value={form.watch("votes")}
                onChange={(event) => {
                  const nextValue = digitsOnlyOnChange(event.target.value);
                  const parsed = nextValue === "" ? 0 : Number(nextValue);
                  setSelectedTier(null);
                  form.setValue("votes", parsed, { shouldValidate: true });
                }}
              />
            </FormField>

            {form.formState.errors.votes && (
              <ErrorText>{form.formState.errors.votes.message}</ErrorText>
            )}

            <TotalBox>
              <TotalText>
                {currentVotes} votes — {formatCurrency(totalCost)}
              </TotalText>
            </TotalBox>

            <Disclaimer>
              <Info size={13} />
              Public votes count for 10% of the final score
            </Disclaimer>

            <SubmitButton
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? "Redirecting to payment…" : "Proceed to Pay"}
            </SubmitButton>
          </Panel>

          <Panel>
            <h3>Payment summary</h3>
            <p style={{ color: "#6B7280" }}>Your vote purchase for {candidate.name} will be charged at ₦100 per vote.</p>
            <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Votes</span>
                <strong>{formatNumber(currentVotes)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Rate</span>
                <strong>₦100.00 each</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total</span>
                <strong>{formatCurrency(totalCost)}</strong>
              </div>
            </div>
          </Panel>
        </Grid>
      </Container>
    </PageWrap>
  );
}
