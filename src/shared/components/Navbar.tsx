import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import {
  HeaderFrame,
  HeaderBar,
  NavOverlay,
  Bar,
  BrandCluster,
  LogoCluster,
  LogoImage,
  BrandDivider,
  BrandText,
  BrandSubtitle,
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
  { to: "/picture-news", label: "Picture News" },
  { to: "/voting", label: "Voting" },
  { to: "/sponsors", label: "Sponsors" },
];

function isNavActive(to: string, pathname: string): boolean {
  return pathname === to;
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
        <HeaderBar $scrolled={scrolled}>
          <Bar>
            <BrandCluster>
              <LogoCluster>
                <a href="/" aria-label="Mbopo Akwa Ibom home">
                  <LogoImage src={akwaIbomLogo} alt="Akwa Ibom State Government logo" />
                </a>
                <a href="/" aria-label="Mbopo Akwa Ibom home">
                  <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
                </a>
              </LogoCluster>
              <BrandDivider $light={light} aria-hidden />
              <BrandText>
                <BrandSubtitle $light={light}>
                  Akwa Ibom State Hotels and Tourism Development Commission
                </BrandSubtitle>
              </BrandText>
            </BrandCluster>

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
          <BrandCluster>
            <LogoCluster>
              <a href="/" aria-label="Mbopo Akwa Ibom home">
                <LogoImage src={akwaIbomLogo} alt="Akwa Ibom State Government logo" />
              </a>
              <a href="/" aria-label="Mbopo Akwa Ibom home">
                <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
              </a>
            </LogoCluster>
          </BrandCluster>
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
