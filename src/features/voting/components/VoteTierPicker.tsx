import styled from "styled-components";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { VoteTier } from "@/features/voting/types";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`;

const TierButton = styled.button<{ $active: boolean }>`
  padding: 14px 10px;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.border)};
  background: ${({ theme, $active }) =>
    $active ? theme.alpha(theme.colors.secondary.DEFAULT, 0.1) : theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }
`;

const Votes = styled.span`
  display: block;
  font-size: 1.05rem;
  font-weight: 800;
`;

const Price = styled.span`
  display: block;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.8rem;
`;

export interface VoteTierPickerProps {
  tiers: VoteTier[];
  selectedVotes: number;
  onSelect: (votes: number) => void;
}

export function VoteTierPicker({ tiers, selectedVotes, onSelect }: VoteTierPickerProps) {
  return (
    <Grid role="group" aria-label="Vote packages">
      {tiers.map((tier) => {
        const active = tier.votes === selectedVotes;
        return (
          <TierButton
            key={tier.votes}
            type="button"
            $active={active}
            aria-pressed={active}
            onClick={() => onSelect(tier.votes)}
          >
            <Votes>
              {formatNumber(tier.votes)} {tier.votes === 1 ? "vote" : "votes"}
            </Votes>
            <Price>{formatCurrency(tier.priceNaira)}</Price>
          </TierButton>
        );
      })}
    </Grid>
  );
}
