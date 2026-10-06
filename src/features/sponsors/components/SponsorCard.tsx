import styled from "styled-components";
import { ExternalLink } from "lucide-react";
import { Card } from "@/shared/ui";
import type { Sponsor } from "@/features/sponsors/types";

const Frame = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)},
      ${({ theme }) => theme.shadows.xl};
  }

  img {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Name = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.2rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Visit = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 8px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Frame>
      <img src={sponsor.logo} alt={`${sponsor.name} logo`} loading="lazy" />
      <Body>
        <Name>{sponsor.name}</Name>
        <Description>{sponsor.description}</Description>
        {sponsor.websiteUrl && (
          <Visit href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer">
            Visit website <ExternalLink size={14} aria-hidden />
          </Visit>
        )}
      </Body>
    </Frame>
  );
}
