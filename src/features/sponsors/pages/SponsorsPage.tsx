import { Container, PageHeroBanner, PageSection, StateMessage } from "@/shared/components";
import { useSponsors } from "@/features/sponsors/api";
import { SponsorGrid } from "@/features/sponsors/components";

export function SponsorsPage() {
  const { data, isLoading, isError } = useSponsors();

  return (
    <>
      <PageHeroBanner
        eyebrow="With Gratitude"
        title="Thank You to Our Partners"
        subtitle="We are grateful to the partners helping make Mbopo Akwa Ibom possible."
      />
      <PageSection>
        <Container>
          {isLoading && <StateMessage title="Loading partners…" />}
          {isError && (
            <StateMessage
              title="Unable to load partners"
              message="Something went wrong. Please try again shortly."
            />
          )}
          {data && data.length > 0 && <SponsorGrid sponsors={data} />}
        </Container>
      </PageSection>
    </>
  );
}
