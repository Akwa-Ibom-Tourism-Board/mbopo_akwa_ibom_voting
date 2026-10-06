import { useQuery } from "@tanstack/react-query";
import { MOCK_SPONSORS } from "@/features/sponsors/data/mock-sponsors";
import type { Sponsor } from "@/features/sponsors/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSponsors(): Promise<Sponsor[]> {
  await delay(300);
  return [...MOCK_SPONSORS];
}

export function useSponsors() {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: getSponsors,
  });
}
