import styled from "styled-components";
import { formatNumber } from "@/lib/formatters";

const Frame = styled.div<{ $large: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: ${({ $large }) => ($large ? "14px 18px" : "10px 14px")};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.06)};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Value = styled.strong<{ $large: boolean }>`
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ $large }) => ($large ? "2rem" : "1.5rem")};
  line-height: 1;
`;

export interface VoteCountBadgeProps {
  count: number;
  large?: boolean;
}

export function VoteCountBadge({ count, large = false }: VoteCountBadgeProps) {
  return (
    <Frame $large={large}>
      <Label>Votes</Label>
      <Value $large={large}>{formatNumber(count)}</Value>
    </Frame>
  );
}
