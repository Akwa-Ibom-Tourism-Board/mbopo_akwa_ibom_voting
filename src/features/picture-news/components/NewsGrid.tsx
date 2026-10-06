import styled from "styled-components";
import type { PictureNewsItem } from "@/features/picture-news/types";
import { NewsCard } from "./NewsCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  padding: 8px 0;
`;

export function NewsGrid({ items }: { items: PictureNewsItem[] }) {
  return (
    <Grid>
      {items.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </Grid>
  );
}
