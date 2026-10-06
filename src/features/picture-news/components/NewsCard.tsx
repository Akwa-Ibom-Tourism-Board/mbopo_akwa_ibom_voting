import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card } from "@/shared/ui";
import { formatDate } from "@/lib/formatters";
import type { PictureNewsItem } from "@/features/picture-news/types";

const Frame = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover,
  &:focus-within {
    transform: translateY(-6px);
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)},
      ${({ theme }) => theme.shadows.xl};
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const PublishedAt = styled.time`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.2rem;
  line-height: 1.3;
`;

// Stretched link: the whole card is clickable, while the title stays the
// accessible name of the one link.
const TitleLink = styled(Link)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }

  &:focus-visible {
    outline: none;
  }
`;

const Summary = styled.p`
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ReadMore = styled.span`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 700;
`;

export function NewsCard({ item }: { item: PictureNewsItem }) {
  return (
    <Frame>
      <img src={item.coverImage} alt="" loading="lazy" />
      <Body>
        <PublishedAt dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</PublishedAt>
        <Title>
          <TitleLink to={`/picture-news/${item.id}`}>{item.title}</TitleLink>
        </Title>
        <Summary>{item.summary}</Summary>
        <ReadMore aria-hidden>Read more →</ReadMore>
      </Body>
    </Frame>
  );
}
