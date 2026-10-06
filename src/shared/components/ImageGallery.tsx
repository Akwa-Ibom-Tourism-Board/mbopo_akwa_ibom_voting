import { useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const Thumb = styled.button`
  padding: 0;
  border: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  cursor: zoom-in;

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }
`;

const FullImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const HiddenText = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

export interface ImageGalleryProps {
  images: string[];
  altPrefix: string;
}

export function ImageGallery({ images, altPrefix }: ImageGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const activeImage = active === null ? undefined : images[active];

  return (
    <>
      <Grid>
        {images.map((src, index) => (
          <Thumb
            key={src}
            type="button"
            aria-label={`Enlarge ${altPrefix} ${index + 1}`}
            onClick={() => setActive(index)}
          >
            <img src={src} alt={`${altPrefix} ${index + 1}`} loading="lazy" />
          </Thumb>
        ))}
      </Grid>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent style={{ maxWidth: 960 }}>
          <HiddenText>
            <DialogTitle>{altPrefix}</DialogTitle>
            <DialogDescription>Enlarged photo</DialogDescription>
          </HiddenText>
          {activeImage && <FullImage src={activeImage} alt={`${altPrefix} ${(active ?? 0) + 1}`} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
