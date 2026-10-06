import styled from "styled-components";
import { Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCandidate } from "@/features/voting/api";
import { formatNumber } from "@/lib/formatters";

const PageWrap = styled.section`
  padding: 120px 0 80px;
`;

const Container = styled.div`
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 900px) {
    grid-template-columns: 420px 1fr;
    align-items: start;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 24px;
  display: block;
`;

const HeroCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Name = styled.h1`
  margin: 0 0 8px;
  font-size: clamp(2.3rem, 4vw, 3.4rem);
`;

const Lga = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
`;

const Tagline = styled.p`
  margin: 0 0 20px;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.gray700};
`;

const VoteSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 18px 0 20px;
  padding: 14px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.04)};
`;

const VoteLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const VoteValue = styled.span`
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 1.5rem;
  font-weight: 800;
`;

const Disclaimer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8rem;
  font-weight: 700;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-weight: 800;
  letter-spacing: 0.04em;
`;

const Section = styled.section`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 1.7rem;
`;

const StoryParagraph = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.gray700};
  line-height: 1.9;
  font-size: 1.04rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 12px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
`;

const VideoWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding-top: 56.25%;
  margin-top: 12px;
`;

const Video = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

export function CandidateDetailPage() {
  const { candidateId } = useParams();
  const { data, isLoading, isError } = useCandidate(candidateId ?? "");

  if (isLoading) {
    return <PageWrap><Container><p>Loading candidate...</p></Container></PageWrap>;
  }

  if (isError || !data) {
    return (
      <PageWrap>
        <Container>
          <h2>Candidate not found</h2>
          <Link to="/voting">← Back to voting</Link>
        </Container>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <Container>
        <Top>
          <HeroImage src={data.photo} alt={data.name} />
          <HeroCard>
            <Name>{data.name}</Name>
            <Lga>{data.lga}</Lga>
            {data.tagline && <Tagline>{data.tagline}</Tagline>}
            <VoteSummary>
              <VoteLabel>Public votes</VoteLabel>
              <VoteValue>{formatNumber(data.voteCount)}</VoteValue>
            </VoteSummary>
            <Disclaimer>
              <Info size={13} />
              Public votes count for 10% of the final score
            </Disclaimer>
            <div style={{ marginTop: 20 }}>
              <PrimaryButton to={`/voting/${data.id}/vote`}>Vote Now</PrimaryButton>
            </div>
          </HeroCard>
        </Top>

        <Section>
          <SectionTitle>Story</SectionTitle>
          {data.story.map((paragraph, index) => (
            <StoryParagraph key={`${data.id}-story-${index}`}>{paragraph}</StoryParagraph>
          ))}
        </Section>

        {data.gallery && data.gallery.length > 0 && (
          <Section>
            <SectionTitle>Gallery</SectionTitle>
            <Gallery>
              {data.gallery.map((image, index) => (
                <GalleryImage
                  key={`${data.id}-gallery-${index}`}
                  src={image}
                  alt={`${data.name} gallery ${index + 1}`}
                />
              ))}
            </Gallery>
          </Section>
        )}

        {data.videoUrls && data.videoUrls.length > 0 && (
          <Section>
            <SectionTitle>Video</SectionTitle>
            <VideoWrap>
              <Video
                src={data.videoUrls[0]}
                title={`${data.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </VideoWrap>
          </Section>
        )}
      </Container>
    </PageWrap>
  );
}
