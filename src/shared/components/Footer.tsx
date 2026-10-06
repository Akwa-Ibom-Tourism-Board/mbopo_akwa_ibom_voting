import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import ariseLogo from "@/assets/arise-logo-main.png";
import mbopoLogo from "@/assets/mbopo-logo-dark.webp";
import { MAIN_SITE_URL } from "@/lib/constants";
import {
  FooterFrame,
  FooterTop,
  BrandColumn,
  LogoRow,
  LogoImage,
  FooterAgency,
  FooterSubline,
  FooterContact,
  ColumnHeading,
  ColumnLinks,
  Socials,
  Social,
  FooterBottom,
} from "./Footer.styles";

export function Footer() {
  return (
    <FooterFrame>
      <FooterTop>
        <BrandColumn>
          <LogoRow>
            <LogoImage src={akwaIbomLogo} alt="Akwa Ibom State Government logo" />
            <LogoImage src={ariseLogo} alt="ARISE Akwa Ibom logo" />
          </LogoRow>
          <LogoRow>
            <LogoImage src={mbopoLogo} alt="Mbopo Akwa Ibom logo" />
          </LogoRow>
          <FooterAgency>Akwa Ibom State Hotels &amp; Tourism Development Commission</FooterAgency>
          <FooterSubline>
            Akwa Ibom State Government
            <br />
            Under the A.R.I.S.E. Agenda
          </FooterSubline>
          <FooterContact href="tel:+2348023311264">
            <Phone size={13} aria-hidden /> For Enquiries: +234 802 331 1264
          </FooterContact>
          <Socials>
            <Social href="https://instagram.com" aria-label="Instagram">
              ig
            </Social>
            <Social href="https://facebook.com" aria-label="Facebook">
              fb
            </Social>
            <Social href="https://x.com" aria-label="X">
              x
            </Social>
          </Socials>
        </BrandColumn>

        <div>
          <ColumnHeading>Explore</ColumnHeading>
          <ColumnLinks>
            <Link to="/picture-news">Photo News</Link>
            <Link to="/voting">Voting</Link>
            <Link to="/sponsors">Partners</Link>
          </ColumnLinks>
        </div>

        <div>
          <ColumnHeading>Mbopo Akwa Ibom</ColumnHeading>
          <ColumnLinks>
            <a href={`${MAIN_SITE_URL}/`}>Main Platform</a>
            <a href={`${MAIN_SITE_URL}/terms`}>Terms &amp; Conditions</a>
            <a href={`${MAIN_SITE_URL}/privacy`}>Privacy Policy</a>
          </ColumnLinks>
        </div>

        <div>
          <ColumnHeading>Contact</ColumnHeading>
          <ColumnLinks>
            <a href="mailto:hello@mbopo.ng">hello@mbopo.ng</a>
            <a href="tel:+2348023311264">+234 802 331 1264</a>
          </ColumnLinks>
        </div>
      </FooterTop>
      <FooterBottom>
        <span>© {new Date().getFullYear()} Mbopo Akwa Ibom. All rights reserved.</span>
        <span>Beauty with Purpose</span>
      </FooterBottom>
    </FooterFrame>
  );
}
