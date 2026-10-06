import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import mbopoLogo from "@/assets/mbopo-logo.webp";
import { MAIN_SITE_URL } from "@/lib/constants";
import {
  HeaderFrame,
  TopBar,
  TopBarInner,
  GovCluster,
  GovLogos,
  GovLogo,
  GovName,
  PortalButton,
  HeaderBar,
  NavOverlay,
  Bar,
  MbopoBrand,
  MbopoLogo,
  MbopoName,
  RightCluster,
  NavLinks,
  NavAnchor,
  MenuButton,
  MobileDrawer,
  MobileDrawerHeader,
  MobileDrawerClose,
  MobileNavList,
  MobileNavRow,
  MobileDrawerActions,
  MobileCtaLink,
} from "./Navbar.styles";

export interface NavbarProps {
  variant?: "overlay" | "solid";
}

const NAV_ITEMS = [
  { to: "/picture-news", label: "Photo News" },
  { to: "/voting", label: "Voting" },
  { to: "/sponsors", label: "Partners" },
];

function isNavActive(to: string, pathname: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const light = variant === "overlay" && !scrolled;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <NavOverlay $visible={menuOpen} aria-label="Close menu" onClick={closeMenu} />
      <HeaderFrame>
        <TopBar>
          <TopBarInner>
            <GovCluster>
              <GovLogos>
                <Link to="/" aria-label="Mbopo Akwa Ibom home">
                  <GovLogo src={akwaIbomLogo} alt="Akwa Ibom State Government crest" />
                </Link>
                <Link to="/" aria-label="Mbopo Akwa Ibom home">
                  <GovLogo src={ariseLogo} alt="ARISE Akwa Ibom logo" />
                </Link>
              </GovLogos>
              <GovName>Akwa Ibom State Hotels and Tourism Development Commission</GovName>
            </GovCluster>
            <PortalButton href={MAIN_SITE_URL}>Mbopo Portal</PortalButton>
          </TopBarInner>
        </TopBar>

        <HeaderBar $scrolled={scrolled}>
          <Bar>
            <MbopoBrand to="/" aria-label="Mbopo Akwa Ibom home">
              <MbopoLogo src={mbopoLogo} alt="Mbopo Akwa Ibom logo" />
              <MbopoName>
                Mbopo Akwa Ibom
                <small>Beauty with Purpose</small>
              </MbopoName>
            </MbopoBrand>

            <NavLinks>
              {NAV_ITEMS.map(({ to, label }) => (
                <NavAnchor
                  key={to}
                  to={to}
                  $light={light}
                  $active={isNavActive(to, location.pathname)}
                >
                  {label}
                </NavAnchor>
              ))}
            </NavLinks>

            <RightCluster>
              <MenuButton
                type="button"
                $light={light}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </MenuButton>
            </RightCluster>
          </Bar>
        </HeaderBar>
      </HeaderFrame>

      <MobileDrawer $open={menuOpen}>
        <MobileDrawerHeader>
          <MbopoBrand to="/" aria-label="Mbopo Akwa Ibom home" onClick={closeMenu}>
            <MbopoLogo src={mbopoLogo} alt="Mbopo Akwa Ibom logo" />
          </MbopoBrand>
          <MobileDrawerClose type="button" aria-label="Close menu" onClick={closeMenu}>
            <X size={18} />
          </MobileDrawerClose>
        </MobileDrawerHeader>

        <MobileNavList>
          {NAV_ITEMS.map(({ to, label }) => (
            <MobileNavRow
              key={to}
              to={to}
              onClick={closeMenu}
              $active={isNavActive(to, location.pathname)}
            >
              {label}
              <ChevronRight size={16} />
            </MobileNavRow>
          ))}
        </MobileNavList>

        <MobileDrawerActions>
          <MobileCtaLink to="/voting" onClick={closeMenu}>
            Vote Now
          </MobileCtaLink>
        </MobileDrawerActions>
      </MobileDrawer>
    </>
  );
}
