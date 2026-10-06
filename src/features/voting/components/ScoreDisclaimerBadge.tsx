import styled from "styled-components";
import { Info } from "lucide-react";
import { SCORE_DISCLAIMER } from "@/features/voting/constants";

const Badge = styled.span<{ $onDark: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $onDark }) =>
    $onDark
      ? theme.alpha(theme.colors.white, 0.12)
      : theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme, $onDark }) => ($onDark ? theme.colors.white : theme.colors.gray700)};
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.3;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

// Always-visible (never tooltip-only) reminder that public votes are worth
// 10% of the final score — shown on cards, the profile and the purchase page.
export function ScoreDisclaimerBadge({ onDark = false }: { onDark?: boolean }) {
  return (
    <Badge $onDark={onDark}>
      <Info size={13} aria-hidden />
      {SCORE_DISCLAIMER}
    </Badge>
  );
}
