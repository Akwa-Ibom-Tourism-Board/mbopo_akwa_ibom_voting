import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageHeroBanner } from "@/shared/components";
import { usePictureNewsList } from "@/features/picture-news/api";
import { formatDate } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
`;

const Card = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)}, ${({ theme }) => theme.shadows.xl};
  }
`;

const Cover = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const Content = styled.div`
  padding: 20px 20px 18px;
`;

const Meta = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Title = styled.h3`
  margin: 0 0 12px;
  font-size: 1.25rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Summary = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.95rem;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
`;

export function PictureNewsListPage() {
  const { data, isLoading, isError } = usePictureNewsList();

  return (
    <PageWrap>
      <PageHeroBanner
        eyebrow="Highlights"
        title="Picture News"
        subtitle="Stories, culture, and destination moments from across Akwa Ibom."
      />

      <Container style={{ marginTop: 42 }}>
        {isLoading && <p>Loading news...</p>}
        {isError && <p>Unable to load picture news right now.</p>}

        {!isLoading && data && (
          <Grid>
            {data.map((item) => (
              <Card key={item.id}>
                <Link to={`/picture-news/${item.id}`} aria-label={`Read more about ${item.title}`}>
                  <Cover src={item.coverImage} alt={item.title} />
                </Link>
                <Content>
                  <Meta>{formatDate(item.publishedAt)}</Meta>
                  <Title>{item.title}</Title>
                  <Summary>{item.summary}</Summary>
                  <ReadMore to={`/picture-news/${item.id}`}>Read more</ReadMore>
                </Content>
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </PageWrap>
  );
}
