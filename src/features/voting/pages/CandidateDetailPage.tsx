import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Share2 } from "lucide-react";
import { Container, ImageGallery, PageSection, StateMessage } from "@/shared/components";
import { Button, sonnerToast } from "@/shared/ui";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { media } from "@/theme";
import { useCandidate, useVotingOverview } from "@/features/voting/api";
import { ScoreDisclaimerBadge, VotingCountdown } from "@/features/voting/components";
import { useVotingCountdown } from "@/features/voting/hooks";

// The whole page sits on the brand's dark-green panel gradient, with the
// same translucent-on-green card treatment the main app's dark sections use.
const GreenPage = styled.div`
  background: ${({ theme }) => theme.gradients.panel};
  color: ${({ theme }) => theme.colors.white};
  /* Fills the space between the fixed navbar and the footer. */
  min-height: 70vh;
  padding: calc(var(--site-header-height) + 24px) 0 80px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.85)};
  font-size: 0.875rem;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`;

const ContestHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const ContestTitle = styled.h2`
  margin: 6px 0 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  font-weight: 600;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;

  ${media.lg} {
    grid-template-columns: 420px minmax(0, 1fr);
    align-items: center;
  }
`;

const PhotoFrame = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.16)};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.sectionDarkCard};
  box-shadow: ${({ theme }) => theme.shadows.xl};

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: top;
  }
`;

const NumberBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  box-shadow: ${({ theme }) => theme.shadows.cta};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const Name = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
`;

const Lga = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  color: ${({ theme }) => theme.colors.highlightMuted};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.85)};
  font-size: 1.05rem;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-self: stretch;
`;

const Stat = styled.div`
  padding: 16px 12px;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.12)};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.sectionDarkCard};
  text-align: center;

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(1.3rem, 3vw, 2rem);
    line-height: 1.1;
  }

  span {
    display: block;
    margin-top: 4px;
    color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ShareButton = styled(Button)`
  && {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.4)};
    color: ${({ theme }) => theme.colors.white};
  }

  &&:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.white, 0.12)};
    border-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Section = styled.section`
  margin-top: 48px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  font-weight: 600;
`;

const Panel = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.12)};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.sectionDarkCard};

  ${media.md} {
    padding: 32px;
  }
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  text-align: center;

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.75rem;
  }

  span {
    color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const Paragraph = styled.p`
  margin: 0 0 16px;
  max-width: 760px;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.85)};
  font-size: 1.02rem;
  line-height: 1.9;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Board = styled.ol`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const BoardRow = styled.li<{ $current: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid
    ${({ theme, $current }) =>
      $current ? theme.colors.secondary.DEFAULT : theme.alpha(theme.colors.white, 0.12)};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.sectionDarkCard};
`;

const BoardLink = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;

  b {
    color: ${({ theme }) => theme.colors.highlight};
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.1rem;
  }

  span {
    overflow: hidden;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  em {
    color: ${({ theme }) => theme.alpha(theme.colors.white, 0.8)};
    font-size: 0.8rem;
    font-style: normal;
    text-align: right;
  }
`;

const BoardBar = styled.div<{ $percent: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.18)};
`;

const Videos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

const VideoFrame = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.black};

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const TOP_N = 5;

export function CandidateDetailPage() {
  const { candidateId = "" } = useParams();
  const { data: candidate, isLoading, isError } = useCandidate(candidateId);
  const { data: overview } = useVotingOverview();
  const { isOpen: votingOpen } = useVotingCountdown();

  if (isLoading) {
    return (
      <PageSection $clearHeader>
        <Container>
          <StateMessage title="Loading candidate…" />
        </Container>
      </PageSection>
    );
  }

  if (isError || !candidate) {
    return (
      <PageSection $clearHeader>
        <Container $maxWidth={720}>
          <StateMessage
            title="Candidate not found"
            message="This candidate doesn't exist or is no longer listed."
            actionTo="/voting"
            actionLabel="Back to voting"
          />
        </Container>
      </PageSection>
    );
  }

  const entry = overview?.leaderboard.find((item) => item.candidate.id === candidate.id);
  const topEntries = overview?.leaderboard.slice(0, TOP_N) ?? [];
  const maxVotes = topEntries[0]?.candidate.voteCount || 1;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      sonnerToast.success("Link copied — share it to help them win!");
    } catch {
      sonnerToast.error("Couldn't copy the link. Please copy it from the address bar.");
    }
  };

  return (
    <GreenPage>
      <Container>
        <BackLink to="/voting">
          <ArrowLeft size={16} aria-hidden /> All candidates
        </BackLink>

        <ContestHeader>
          <div>
            <Eyebrow>Beauty Pageant · Public Vote</Eyebrow>
            <ContestTitle>Mbopo Akwa Ibom</ContestTitle>
          </div>
          <VotingCountdown />
        </ContestHeader>

        <Hero>
          <PhotoFrame>
            <img src={candidate.photo} alt={candidate.name} />
            <NumberBadge>No. {String(candidate.number).padStart(3, "0")}</NumberBadge>
          </PhotoFrame>

          <Info>
            <Lga>
              <MapPin size={14} aria-hidden /> {candidate.lga}
            </Lga>
            <Name>{candidate.name}</Name>
            {candidate.tagline && <Tagline>{candidate.tagline}</Tagline>}

            <Stats>
              <Stat>
                <strong>{formatNumber(candidate.voteCount)}</strong>
                <span>Votes</span>
              </Stat>
              <Stat>
                <strong>{entry ? `${entry.percent.toFixed(1)}%` : "—"}</strong>
                <span>Of all votes</span>
              </Stat>
              {/* <Stat>
                <strong>{entry ? `#${entry.rank}` : "—"}</strong>
                <span>Rank</span>
              </Stat> */}
            </Stats>

            {/* <ScoreDisclaimerBadge onDark /> */}

            <Actions>
              {votingOpen ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link to={`/voting/${candidate.id}/vote`}>Vote Now</Link>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" disabled>
                  Voting closed
                </Button>
              )}
              <ShareButton size="lg" variant="outline" type="button" onClick={handleShare}>
                <Share2 size={16} aria-hidden /> Share
              </ShareButton>
            </Actions>
          </Info>
        </Hero>

        {overview && (
          <Section>
            <Panel>
              <Overview>
                <div>
                  <strong>{overview.candidateCount}</strong>
                  <span>Candidates</span>
                </div>
                <div>
                  <strong>{formatCurrency(overview.pricePerVote)}</strong>
                  <span>Per vote</span>
                </div>
                <div>
                  <strong>{formatNumber(overview.totalVotes)}</strong>
                  <span>Total votes</span>
                </div>
              </Overview>
            </Panel>
          </Section>
        )}

        <Section>
          <SectionTitle>About {candidate.name}</SectionTitle>
          <Panel>
            {candidate.story.map((paragraph) => (
              <Paragraph key={paragraph}>{paragraph}</Paragraph>
            ))}
          </Panel>
        </Section>

        {candidate.gallery && candidate.gallery.length > 0 && (
          <Section>
            <SectionTitle>Gallery</SectionTitle>
            <ImageGallery images={candidate.gallery} altPrefix={`${candidate.name} photo`} />
          </Section>
        )}

        {candidate.videoUrls && candidate.videoUrls.length > 0 && (
          <Section>
            <SectionTitle>Videos</SectionTitle>
            <Videos>
              {candidate.videoUrls.map((url, index) => (
                <VideoFrame key={url}>
                  <iframe
                    src={url}
                    title={`${candidate.name} video ${index + 1}`}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </VideoFrame>
              ))}
            </Videos>
          </Section>
        )}

        {/* {topEntries.length > 0 && (
          <Section>
            <SectionTitle>Leaderboard</SectionTitle>
            <Board>
              {topEntries.map((item) => (
                <BoardRow key={item.candidate.id} $current={item.candidate.id === candidate.id}>
                  <BoardBar $percent={(item.candidate.voteCount / maxVotes) * 100} />
                  <BoardLink to={`/voting/${item.candidate.id}`}>
                    <b>{item.rank}</b>
                    <span>
                      No. {String(item.candidate.number).padStart(3, "0")} · {item.candidate.name}
                    </span>
                    <em>
                      {formatNumber(item.candidate.voteCount)} · {item.percent.toFixed(1)}%
                    </em>
                  </BoardLink>
                </BoardRow>
              ))}
            </Board>
          </Section>
        )} */}
      </Container>
    </GreenPage>
  );
}
