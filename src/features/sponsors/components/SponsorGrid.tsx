import styled from "styled-components";
import type { Sponsor } from "@/features/sponsors/types";
import { SponsorCard } from "./SponsorCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding: 8px 0;
`;

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <Grid>
      {sponsors.map((sponsor) => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} />
      ))}
    </Grid>
  );
}
