import { Container, PageHeroBanner, PageSection, StateMessage } from "@/shared/components";
import { usePictureNewsList } from "@/features/picture-news/api";
import { NewsGrid } from "@/features/picture-news/components";

export function PictureNewsListPage() {
  const { data, isLoading, isError } = usePictureNewsList();

  return (
    <>
      <PageHeroBanner
        eyebrow="Highlights"
        title="Photo News"
        subtitle="Stories, culture, and destination moments from across Akwa Ibom."
      />
      <PageSection>
        <Container>
          {isLoading && <StateMessage title="Loading stories…" />}
          {isError && (
            <StateMessage
              title="Unable to load photo news"
              message="Something went wrong. Please try again shortly."
            />
          )}
          {data && data.length === 0 && (
            <StateMessage title="No stories yet" message="Check back soon for new updates." />
          )}
          {data && data.length > 0 && <NewsGrid items={data} />}
        </Container>
      </PageSection>
    </>
  );
}
