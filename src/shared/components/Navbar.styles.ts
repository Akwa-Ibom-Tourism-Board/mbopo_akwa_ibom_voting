import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/theme";

export const TOP_BAR_HEIGHT = 40;
const MAIN_LOGO_HEIGHT_MOBILE = 40;
const MAIN_LOGO_HEIGHT_DESKTOP = 48;
const MAIN_BAR_PADDING = 10;

// Total fixed-header height (top strip + main nav row), used to offset page
// content in app/providers.tsx. Derived from the same numbers that size the
// bars so they can't drift apart.
export const HEADER_HEIGHT_MOBILE = TOP_BAR_HEIGHT + MAIN_BAR_PADDING * 2 + MAIN_LOGO_HEIGHT_MOBILE;
export const HEADER_HEIGHT_DESKTOP =
  TOP_BAR_HEIGHT + MAIN_BAR_PADDING * 2 + MAIN_LOGO_HEIGHT_DESKTOP;

// Fixed frame for the whole header stack (disclaimer strip + nav bar) —
// the strip lives inside this, as a normal-flow first child, rather than
// as its own independently-fixed element, so the two never need
// hardcoded height coordination to stack correctly.
export const HeaderFrame = styled.header`
  position: fixed;
  /* Above floatingAction (the home page's scroll-to-top button) so the
     header — and, at the same level, its mobile-menu overlay below —
     always sits on top of floating page chrome, not just page content. */
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 0;
  left: 0;
  right: 0;
`;

// Slim government strip above the main nav: state crest + ARISE logo and the
// commission name on the left, the Mbopo Portal button on the right.
export const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
`;

export const TopBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: min(1200px, calc(100% - 32px));
  height: ${TOP_BAR_HEIGHT}px;
  margin: 0 auto;
`;

export const GovCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const GovLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;

  a {
    display: flex;
  }
`;

export const GovLogo = styled.img`
  display: block;
  width: auto;
  height: 28px;
  max-width: 80px;
  object-fit: contain;
`;

export const GovName = styled.span`
  display: none;
  overflow: hidden;
  padding-left: 10px;
  border-left: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.3)};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;

  ${media.sm} {
    display: block;
  }

  ${media.md} {
    font-size: 11px;
  }
`;

export const PortalButton = styled.a`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 28px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
  }
`;

export const MbopoBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 0 0 auto;
`;

export const MbopoLogo = styled.img`
  display: block;
  width: auto;
  height: ${MAIN_LOGO_HEIGHT_MOBILE}px;
  max-width: 140px;
  object-fit: contain;

  ${media.md} {
    height: ${MAIN_LOGO_HEIGHT_DESKTOP}px;
  }
`;

export const MbopoName = styled.span`
  display: none;
  flex-direction: column;
  gap: 1px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};

  small {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted.foreground};
  }

  ${media.sm} {
    display: flex;
  }
`;

export const HeaderBar = styled.div<{ $scrolled: boolean }>`
  padding: ${MAIN_BAR_PADDING}px 0;
  background: ${({ theme, $scrolled }) => ($scrolled ? theme.alpha(theme.colors.background, 0.94) : "transparent")};
  box-shadow: ${({ $scrolled }) => ($scrolled ? "0 3px 24px rgba(11, 73, 35, 0.1)" : "none")};
  backdrop-filter: blur(12px);
  transition:
    background ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};
`;

export const Bar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  gap: 16px;
`;

export const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

// Sits behind the mobile menu card but above the page content, so opening
// the menu blurs/dims everything else instead of leaving it fully visible.
// z-index is below Header's so the header bar (and the menu card inside
// it) always stays on top and unblurred.
export const NavOverlay = styled.button<{ $visible: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  /* Same level as Header — Header is rendered after this in the DOM, so
     it (and everything inside it, including the mobile menu card) still
     paints on top at equal z-index. */
  z-index: ${({ theme }) => theme.zIndex.modal};
  border: none;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  cursor: pointer;

  @media (max-width: 1023px) {
    display: ${({ $visible }) => ($visible ? "block" : "none")};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NavAnchor = styled(Link)<{ $light: boolean; $active?: boolean }>`
  position: relative;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 4px;
    width: 55%;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    opacity: 1;
    background: ${({ theme, $light }) => ($light ? "rgba(255, 255, 255, 0.15)" : theme.alpha(theme.colors.primary.DEFAULT, 0.08))};
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

export const MenuButton = styled.button<{ $light: boolean }>`
  display: none;
  border: 0;
  background: transparent;
  color: ${({ theme, $light }) => ($light ? theme.colors.white : theme.colors.foreground)};
  cursor: pointer;

  @media (max-width: 1023px) {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
  }
`;

// ---------------------------------------------------------------------
// Mobile drawer — a distinct, purpose-built panel (not a CSS reflow of
// the desktop pill nav): its own header row, chevron rows, and two
// full-width stacked buttons, matching the reference's mobile menu.
// ---------------------------------------------------------------------

export const MobileDrawer = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 1023px) {
    display: block;
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
    top: 12px;
    right: 12px;
    left: 12px;
    max-height: calc(100dvh - 24px);
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.card};
    border-radius: ${({ theme }) => theme.radii["2xl"]};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: translateY(${({ $open }) => ($open ? "0" : "-12px")});
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.transitions.base};
  }
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileDrawerClose = styled.button`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
`;

export const MobileNavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
`;

export const MobileNavRow = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : theme.colors.foreground)};

  &:last-child {
    border-bottom: none;
  }

  svg:last-child {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.muted.foreground};
  }
`;

export const MobileDrawerActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileCtaLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.cta};
`;
