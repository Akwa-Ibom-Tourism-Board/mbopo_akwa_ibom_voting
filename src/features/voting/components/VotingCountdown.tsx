import styled from "styled-components";
import { Clock } from "lucide-react";
import { useVotingCountdown } from "@/features/voting/hooks/useVotingCountdown";

const Frame = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Label = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: ${({ theme }) => theme.colors.highlightMuted};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Units = styled.div`
  display: flex;
  gap: 10px;
`;

const Unit = styled.div`
  min-width: 72px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.16)};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.sectionDarkCard};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.75rem;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }

  span {
    color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const pad = (value: number) => String(value).padStart(2, "0");

// Built for dark-green surfaces (the page banner and the candidate page).
export function VotingCountdown() {
  const { isLoading, isOpen, hours, minutes, seconds } = useVotingCountdown();

  if (isLoading) return null;

  if (!isOpen) {
    return (
      <Frame>
        <Label>
          <Clock size={14} aria-hidden /> Voting has closed
        </Label>
      </Frame>
    );
  }

  return (
    <Frame role="timer" aria-label="Time left to vote">
      <Label>
        <Clock size={14} aria-hidden /> Voting closes in
      </Label>
      <Units>
        <Unit>
          <strong>{hours}</strong>
          <span>Hours</span>
        </Unit>
        <Unit>
          <strong>{pad(minutes)}</strong>
          <span>Minutes</span>
        </Unit>
        <Unit>
          <strong>{pad(seconds)}</strong>
          <span>Seconds</span>
        </Unit>
      </Units>
    </Frame>
  );
}
