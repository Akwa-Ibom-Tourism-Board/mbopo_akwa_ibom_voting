import { useQuery } from "@tanstack/react-query";
import { MOCK_NEWS } from "@/features/picture-news/data/mock-news";
import type { PictureNewsItem } from "@/features/picture-news/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPictureNewsList(): Promise<PictureNewsItem[]> {
  await delay(300);
  return [...MOCK_NEWS];
}

export async function getPictureNewsItem(id: string): Promise<PictureNewsItem | undefined> {
  await delay(250);
  return MOCK_NEWS.find((item) => item.id === id);
}

export function usePictureNewsList() {
  return useQuery({
    queryKey: ["picture-news"],
    queryFn: getPictureNewsList,
  });
}

export function usePictureNewsItem(id: string) {
  return useQuery({
    queryKey: ["picture-news", id],
    queryFn: () => getPictureNewsItem(id),
    enabled: Boolean(id),
  });
}
