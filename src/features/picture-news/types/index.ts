export interface PictureNewsItem {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  images?: string[];
  body: string[];
  publishedAt: string;
}
