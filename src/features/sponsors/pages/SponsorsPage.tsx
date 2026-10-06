import styled from "styled-components";
import { PageHeroBanner } from "@/shared/components";
import { useSponsors } from "@/features/sponsors/api";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 42px;
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 22px;
`;

const Logo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 18px;
`;

const Name = styled.h3`
  margin: 0 0 10px;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray500};
  line-height: 1.7;
`;

const VisitLink = styled.a`
  display: inline-block;
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-weight: 700;
`;

export function SponsorsPage() {
  const { data, isLoading, isError } = useSponsors();

  return (
    <PageWrap>
      <PageHeroBanner
        eyebrow="Support"
        title="Thank You to Our Sponsors"
        subtitle="We appreciate the partners helping make Akwa Ibom's tourism story brighter and more visible."
      />

      <Container>
        {isLoading && <p>Loading sponsors...</p>}
        {isError && <p>Unable to load sponsors right now.</p>}

        {!isLoading && data && (
          <Grid>
            {data.map((sponsor) => (
              <Card key={sponsor.id}>
                <Logo src={sponsor.logo} alt={sponsor.name} />
                <Name>{sponsor.name}</Name>
                <Description>{sponsor.description}</Description>
                {sponsor.websiteUrl && (
                  <VisitLink href={sponsor.websiteUrl} target="_blank" rel="noreferrer">
                    Visit
                  </VisitLink>
                )}
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </PageWrap>
  );
}
