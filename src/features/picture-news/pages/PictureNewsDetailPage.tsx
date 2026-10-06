import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { usePictureNewsItem } from "@/features/picture-news/api";
import { formatDate } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(1000px, calc(100% - 32px));
  margin: 0 auto;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 22px;
  display: block;
`;

const Body = styled.article`
  margin-top: 32px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Meta = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.86rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Paragraph = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 1.02rem;
  line-height: 1.9;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 28px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 700;
`;

export function PictureNewsDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = usePictureNewsItem(id ?? "");

  if (isLoading) {
    return <PageWrap><Container><p>Loading story...</p></Container></PageWrap>;
  }

  if (isError || !data) {
    return (
      <PageWrap>
        <Container>
          <BackLink to="/picture-news">← Back to picture news</BackLink>
          <h2>Story not found</h2>
        </Container>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <Container>
        <BackLink to="/picture-news">← Back to picture news</BackLink>
        <HeroImage src={data.coverImage} alt={data.title} />
        <Body>
          <Meta>{formatDate(data.publishedAt)}</Meta>
          <Title>{data.title}</Title>
          {data.body.map((paragraph, index) => (
            <Paragraph key={`${data.id}-paragraph-${index}`}>{paragraph}</Paragraph>
          ))}
        </Body>

        {data.images && data.images.length > 0 && (
          <Gallery>
            {data.images.map((image, index) => (
              <GalleryImage key={`${data.id}-image-${index}`} src={image} alt={`${data.title} gallery ${index + 1}`} />
            ))}
          </Gallery>
        )}
      </Container>
    </PageWrap>
  );
}
