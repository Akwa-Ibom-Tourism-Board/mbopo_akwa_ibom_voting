import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { SonnerToaster, TooltipProvider } from "@/shared/ui";
import { HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from "@/shared/components/Navbar.styles";
import { GlobalStyle, media, theme } from "@/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: false,
    },
  },
});

// The fixed header is two rows (government strip + main nav) whose height only
// changes at one breakpoint (main logo 40px → 48px, see Navbar.styles.ts).
// Overrides the theme's fallback so banners and top-of-page content clear it
// at every screen size.
const HeaderOffset = createGlobalStyle`
  :root {
    --site-header-height: ${HEADER_HEIGHT_MOBILE}px;
  }

  ${media.md} {
    :root {
      --site-header-height: ${HEADER_HEIGHT_DESKTOP}px;
    }
  }
`;

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HeaderOffset />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SonnerToaster />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
