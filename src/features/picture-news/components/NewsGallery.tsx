import { ImageGallery } from "@/shared/components";

export function NewsGallery({ images, title }: { images: string[]; title: string }) {
  return <ImageGallery images={images} altPrefix={`${title} — photo`} />;
}
