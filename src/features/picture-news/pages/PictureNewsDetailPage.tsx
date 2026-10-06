import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container, PageSection, StateMessage } from "@/shared/components";
import { formatDate } from "@/lib/formatters";
import { usePictureNewsItem } from "@/features/picture-news/api";
import { NewsGallery } from "@/features/picture-news/components";

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.875rem;
  font-weight: 700;
`;

const Hero = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Article = styled.article`
  margin-top: 32px;
`;

const PublishedAt = styled.time`
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 8px 0 24px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.9rem, 4vw, 2.75rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Paragraph = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 1.02rem;
  line-height: 1.9;
`;

const GallerySection = styled.section`
  margin-top: 40px;
`;

export function PictureNewsDetailPage() {
  const { id = "" } = useParams();
  const { data: item, isLoading, isError } = usePictureNewsItem(id);

  if (isLoading) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={820}>
          <StateMessage title="Loading story…" />
        </Container>
      </PageSection>
    );
  }

  if (isError || !item) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage
            title="Story not found"
            message="This story doesn't exist or has been removed."
            actionTo="/picture-news"
            actionLabel="Back to Photo News"
          />
        </Container>
      </PageSection>
    );
  }

  return (
    <PageSection $clearHeader>
      <Container $maxWidth={820}>
        <BackLink to="/picture-news">
          <ArrowLeft size={16} aria-hidden /> Back to Photo News
        </BackLink>
        <Hero src={item.coverImage} alt={item.title} />
        <Article>
          <PublishedAt dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</PublishedAt>
          <Title>{item.title}</Title>
          {item.body.map((paragraph) => (
            <Paragraph key={paragraph}>{paragraph}</Paragraph>
          ))}
        </Article>

        {item.images && item.images.length > 1 && (
          <GallerySection>
            <NewsGallery images={item.images} title={item.title} />
          </GallerySection>
        )}
      </Container>
    </PageSection>
  );
}
