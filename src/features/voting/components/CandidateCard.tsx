import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Card } from "@/shared/ui";
import type { Candidate } from "@/features/voting/types";
import { ScoreDisclaimerBadge } from "./ScoreDisclaimerBadge";
import { useVotingCountdown } from "@/features/voting/hooks";
import { VoteCountBadge } from "./VoteCountBadge";

// The glow lives on a blurred pseudo-element behind the card (hence
// `isolation` + z-index -1) so it reads as radiant light rather than a hard
// outline; the ring + depth shadow sit on the card surface itself.
const Frame = styled.article`
  position: relative;
  isolation: isolate;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: -14px;
    z-index: -1;
    border-radius: ${({ theme }) => theme.radii["2xl"]};
    background: radial-gradient(
      closest-side,
      ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.55)},
      transparent
    );
    filter: blur(18px);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.base};
    pointer-events: none;
  }

  &:hover::before,
  &:focus-within::before {
    opacity: 1;
  }
`;

const Surface = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  ${Frame}:hover &,
  ${Frame}:focus-within & {
    transform: translateY(-6px);
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)},
      ${({ theme }) => theme.shadows.xl};
  }
`;

const PhotoLink = styled(Link)`
  position: relative;
  display: block;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: top;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  ${Frame}:hover & img {
    transform: scale(1.04);
  }
`;

const NumberBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
`;

const Name = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  line-height: 1.2;
`;

const Lga = styled.p`
  margin: 2px 0 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 4px;
`;

// Quieter at rest, focal on card hover — but only where hover exists, so on
// touch screens "View Details" is always fully visible and tappable.
const DetailsButton = styled(Button)`
  @media (hover: hover) {
    &&:not(:hover) {
      border-color: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.muted.foreground};
    }

    ${Frame}:hover && {
      background: ${({ theme }) => theme.colors.primary.DEFAULT};
      border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
      color: ${({ theme }) => theme.colors.primary.foreground};
    }
  }
`;

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const { isOpen } = useVotingCountdown();

  return (
    <Frame>
      <Surface>
        <PhotoLink to={`/voting/${candidate.id}`} tabIndex={-1} aria-hidden>
          <img src={candidate.photo} alt="" loading="lazy" />
          <NumberBadge>No. {String(candidate.number).padStart(3, "0")}</NumberBadge>
        </PhotoLink>
        <Body>
          <div>
            <Name>{candidate.name}</Name>
            <Lga>{candidate.lga}</Lga>
          </div>
          {candidate.tagline && <Tagline>{candidate.tagline}</Tagline>}
          <Spacer />
          <VoteCountBadge count={candidate.voteCount} />
          {/* <div>
            <ScoreDisclaimerBadge />
          </div> */}
          <Actions>
            <DetailsButton variant="outline" asChild>
              <Link to={`/voting/${candidate.id}`}>View Details</Link>
            </DetailsButton>
            {isOpen ? (
              <Button variant="secondary" asChild>
                <Link to={`/voting/${candidate.id}/vote`}>Vote Now</Link>
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Voting closed
              </Button>
            )}
          </Actions>
        </Body>
      </Surface>
    </Frame>
  );
}
