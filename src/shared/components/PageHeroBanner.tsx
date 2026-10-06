import type { ReactNode } from "react";
import { Container } from "./Container";
import {
  BannerFrame,
  BannerEyebrow,
  BannerTitle,
  BannerSubtitle,
  BannerExtra,
} from "./PageHeroBanner.styles";

export interface PageHeroBannerProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export function PageHeroBanner({ eyebrow, title, subtitle, children }: PageHeroBannerProps) {
  return (
    <BannerFrame>
      <Container>
        {eyebrow && <BannerEyebrow>{eyebrow}</BannerEyebrow>}
        <BannerTitle>{title}</BannerTitle>
        {subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
        {children && <BannerExtra>{children}</BannerExtra>}
      </Container>
    </BannerFrame>
  );
}
