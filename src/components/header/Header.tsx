import React from "react";
import "../../styles/header/header.scss";
import { Link } from "react-router-dom";
import { useScrolling } from "../../context/ScrollHeader";
import ScrollHeader from "./ScrollHeader";
import Mobileheader from "./Mobileheader";
import LanguageSelector from "./LanguageSelector";
import { useLogo } from "../../context/GetLogoContext";
import UpScrollHeader from "./UpScrollHeader";

export type HeaderTitleType = {
  id: number;
  title: string;
  to: string;
};

export type HeaderLogoType = {
  id: number;
  logo: string;
  scroll_logo: string;
  qr_code: string,
  hero_banner: string,
  bepartner_banner: string,
  contact_banner: string,
};

const Header = () => {
  const { logo } = useLogo();

  const { isScrolled, upScrollHeader } = useScrolling();

  const [mobile, setMobile] = React.useState<boolean>(false);
  React.useEffect(() => {
    const ControlResize = () => {
      if (window.innerWidth <= 1080) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    ControlResize();
    window.addEventListener("resize", ControlResize);
    return () => window.removeEventListener("resize", ControlResize);
  }, []);


  return (
    <React.Fragment>
      {mobile ? (
        <Mobileheader />
      ) : (
        <React.Fragment>
          {isScrolled ? (
            <ScrollHeader />
          ) : upScrollHeader ? (
            <UpScrollHeader />
          ) : (
            <header className="header">
              <Link to="/" className="left">
                {logo.slice(0, 1).map((logo: HeaderLogoType, i: number) => (
                  <img src={logo.logo} key={i}/>
                ))}
              </Link>

              <div className="right">
                <LanguageSelector />
              </div>
            </header>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Header;
