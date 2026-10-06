import styled from "styled-components";

// Content block that sits either directly below a PageHeroBanner
// (`$clearHeader` omitted) or at the very top of a page with no banner,
// where it has to clear the fixed Navbar itself. --site-header-height is
// set once in app/providers.tsx.
export const PageSection = styled.section<{ $clearHeader?: boolean }>`
  padding: ${({ $clearHeader }) =>
      $clearHeader ? "calc(var(--site-header-height) + 32px)" : "40px"}
    0 80px;
`;
